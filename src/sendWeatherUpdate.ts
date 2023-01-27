import { bot } from "./index";

export async function sendWeatherUpdate(chatId: number, weather: any) {
  await bot.sendPhoto(chatId, weather.current.condition.icon.substring(2), {
    caption: weather.current.condition.text,
  });
  await bot.sendMessage(
    chatId,
    `
    ${weather.location.name} - ${weather.location.country}
Temperature: ${weather.current.temp_c}°C / ${weather.current.temp_f}°F
Condition: ${weather.current.condition.text}
Humidity: ${weather.current.humidity}%
Wind Speed: ${weather.current.wind_kph} km/h
    `
  );
}
