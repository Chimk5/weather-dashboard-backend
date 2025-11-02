"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchWeather = void 0;
const weatherService_js_1 = require("../services/weatherService.js");
const fetchWeather = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ error: "Latitude and longitude are required" });
        }
        const data = await (0, weatherService_js_1.getWeatherData)(Number(lat), Number(lon));
        res.json(data);
    }
    catch (error) {
        console.error("Weather fetch error:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
};
exports.fetchWeather = fetchWeather;
//# sourceMappingURL=weatherController.js.map