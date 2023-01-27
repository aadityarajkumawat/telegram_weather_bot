import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import cron from "node-cron";
import { readFileSync, writeFileSync } from "fs";
import { getWeather } from "./getWeather";
import { sendWeatherUpdate } from "./sendWeatherUpdate";

dotenv.config();

const chatsFile = readFileSync("./chats.json", "utf8");
const { chats } = JSON.parse(chatsFile);

const token = process.env.TELEGRAM_TOKEN || "";

export const bot = new TelegramBot(token, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (!chats.includes(chatId)) {
    chats.push(chatId);
    writeFileSync("./chats.json", JSON.stringify({ chats }));
  }

  await sendWeatherUpdate(chatId, await getWeather());
});

cron.schedule("0 0 * * * *", async () => {
  const weather = await getWeather();

  const weatherResolver = (chatId: number) => () =>
    sendWeatherUpdate(chatId, weather);

  const usersUpdates = [];

  for (let chatId of chats) {
    const update = weatherResolver(chatId);
    usersUpdates.push(update);
  }

  await Promise.all(usersUpdates.map((update) => update()));
});
