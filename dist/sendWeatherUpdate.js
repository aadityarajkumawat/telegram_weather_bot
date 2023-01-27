"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWeatherUpdate = void 0;
const index_1 = require("./index");
async function sendWeatherUpdate(chatId, weather) {
    await index_1.bot.sendPhoto(chatId, weather.current.condition.icon.substring(2), {
        caption: weather.current.condition.text,
    });
    await index_1.bot.sendMessage(chatId, `
    ${weather.location.name} - ${weather.location.country}
Temperature: ${weather.current.temp_c}°C / ${weather.current.temp_f}°F
Condition: ${weather.current.condition.text}
Humidity: ${weather.current.humidity}%
Wind Speed: ${weather.current.wind_kph} km/h
    `);
}
exports.sendWeatherUpdate = sendWeatherUpdate;
//# sourceMappingURL=sendWeatherUpdate.js.map