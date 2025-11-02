"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHourlyWeatherData = exports.getWeatherData = void 0;
const axios_1 = require("axios");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const fs_1 = require("fs");
// ✅ Load .env safely (works from any directory)
const envPath = path_1.default.resolve(process.cwd(), ".env");
if (fs_1.default.existsSync(envPath)) {
    dotenv_1.default.config({ path: envPath });
    console.log("✅ Loaded .env from:", envPath);
}
else {
    console.warn("⚠️ .env file not found at:", envPath);
}
const getWeatherData = async (lat, lon, cityName, country) => {
    const baseUrl = process.env.WEATHER_API_URL?.trim();
    const apiKey = process.env.WEATHER_API_KEY?.trim();
    // ✅ Debug logging
    console.log("🌍 WEATHER_API_URL:", baseUrl);
    console.log("🔑 WEATHER_API_KEY:", apiKey ? "Loaded ✅" : "Missing ❌");
    if (!baseUrl || !apiKey) {
        throw new Error("❌ Missing WEATHER_API_URL or WEATHER_API_KEY in .env file");
    }
    // ✅ Construct WeatherAPI.com URL
    const url = `${baseUrl}?key=${apiKey}&q=${lat},${lon}&aqi=no`;
    try {
        console.log("📡 Fetching weather from:", url);
        const response = await axios_1.default.get(url, {
            headers: { Accept: "application/json" },
            timeout: 10000, // prevent hanging requests
        });
        console.log("✅ Weather data received successfully");
        const data = response.data;
        return {
            location: {
                city: cityName || data.location.name,
                country: country || data.location.country,
            },
            current: {
                temperature: data.current.temp_c,
                humidity: data.current.humidity,
                condition: data.current.condition.text,
                wind_speed: data.current.wind_kph,
                icon: data.current.condition.icon,
            },
        };
    }
    catch (error) {
        console.error("🌧 Weather API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch weather data from WeatherAPI.com");
    }
};
exports.getWeatherData = getWeatherData;
const getHourlyWeatherData = async (lat, lon, cityName, country) => {
    try {
        const response = await axios_1.default.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=auto&forecast_days=1`);
        const { time, temperature_2m, relative_humidity_2m, precipitation_probability, weather_code, wind_speed_10m } = response.data.hourly;
        const minLength = Math.min(time.length, temperature_2m.length, relative_humidity_2m.length, precipitation_probability.length, weather_code.length, wind_speed_10m.length);
        const hourlyData = {
            city: cityName,
            country,
            hourly: time.slice(0, minLength).map((time, i) => ({
                time,
                temperature: temperature_2m[i],
                humidity: relative_humidity_2m[i],
                precipitation_probability: precipitation_probability[i],
                weather_code: weather_code[i],
                wind_speed: wind_speed_10m[i],
            })),
        };
        return hourlyData;
    }
    catch (error) {
        console.error("🌧 Hourly Weather API Error:", error.response?.data || error.message);
        throw new Error("Failed to fetch hourly weather data");
    }
};
exports.getHourlyWeatherData = getHourlyWeatherData;
//# sourceMappingURL=weatherService.js.map