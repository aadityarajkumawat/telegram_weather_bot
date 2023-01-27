"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const fs_1 = require("fs");
const getWeather_1 = require("./getWeather");
const sendWeatherUpdate_1 = require("./sendWeatherUpdate");
dotenv_1.default.config();
const chatsFile = (0, fs_1.readFileSync)("./chats.json", "utf8");
const { chats } = JSON.parse(chatsFile);
const token = process.env.TELEGRAM_TOKEN || "";
exports.bot = new node_telegram_bot_api_1.default(token, { polling: true });
exports.bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    if (!chats.includes(chatId)) {
        chats.push(chatId);
        (0, fs_1.writeFileSync)("./chats.json", JSON.stringify({ chats }));
    }
    await (0, sendWeatherUpdate_1.sendWeatherUpdate)(chatId, await (0, getWeather_1.getWeather)());
});
node_cron_1.default.schedule("0 0 * * * *", async () => {
    const weather = await (0, getWeather_1.getWeather)();
    const weatherResolver = (chatId) => () => (0, sendWeatherUpdate_1.sendWeatherUpdate)(chatId, weather);
    const usersUpdates = [];
    for (let chatId of chats) {
        const update = weatherResolver(chatId);
        usersUpdates.push(update);
    }
    await Promise.all(usersUpdates.map((update) => update()));
});
//# sourceMappingURL=index.js.map