import express from "express";
import axios from "axios";
const router = express.Router();
// ✅ Current weather
router.get("/current", async (req, res) => {
    try {
        const city = req.query.city;
        if (!city)
            return res.status(400).json({ error: "City is required" });
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
        if (!geoResponse.data.results?.length)
            return res.status(404).json({ error: "City not found" });
        const { latitude, longitude, name, country } = geoResponse.data.results[0];
        const weatherResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const current = weatherResponse.data.current_weather;
        const data = {
            location: { city: name, country },
            current: {
                temperature: current.temperature,
                condition: current.weathercode,
                wind_speed: current.windspeed,
                humidity: 60, // mock if unavailable
                icon: "https://cdn-icons-png.flaticon.com/512/1116/1116453.png",
            },
        };
        res.json(data);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch current weather" });
    }
});
// ✅ 7-day forecast
router.get("/forecast", async (req, res) => {
    try {
        const city = req.query.city;
        if (!city)
            return res.status(400).json({ error: "City is required" });
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
        if (!geoResponse.data.results?.length)
            return res.status(404).json({ error: "City not found" });
        const { latitude, longitude, name, country } = geoResponse.data.results[0];
        const forecastResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
        const forecastData = {
            city: name,
            country,
            daily: forecastResponse.data.daily,
        };
        res.json(forecastData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch forecast data" });
    }
});
// ✅ City search
router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query)
            return res.status(400).json({ error: "Query is required" });
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5`);
        if (!geoResponse.data.results?.length)
            return res.status(404).json({ error: "No cities found" });
        const cities = geoResponse.data.results.map((result) => ({
            city: result.name,
            country: result.country,
            latitude: result.latitude,
            longitude: result.longitude,
        }));
        res.json(cities);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to search cities" });
    }
});
// ✅ 30-day historical data
router.get("/history", async (req, res) => {
    try {
        const city = req.query.city;
        if (!city)
            return res.status(400).json({ error: "City is required" });
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
        if (!geoResponse.data.results?.length)
            return res.status(404).json({ error: "City not found" });
        const { latitude, longitude } = geoResponse.data.results[0];
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 30);
        const historyResponse = await axios.get(`https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${startDate.toISOString().split('T')[0]}&end_date=${endDate.toISOString().split('T')[0]}&daily=temperature_2m_mean,precipitation_sum&timezone=auto`);
        const historyData = historyResponse.data.daily.time.map((date, i) => ({
            date,
            temperature: historyResponse.data.daily.temperature_2m_mean[i],
            precipitation: historyResponse.data.daily.precipitation_sum[i],
        }));
        res.json(historyData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch historical data" });
    }
});
// ✅ Hourly forecast for next 24 hours
router.get("/hourly", async (req, res) => {
    try {
        const city = req.query.city;
        if (!city)
            return res.status(400).json({ error: "City is required" });
        const geoResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`);
        if (!geoResponse.data.results?.length)
            return res.status(404).json({ error: "City not found" });
        const { latitude, longitude, name, country } = geoResponse.data.results[0];
        const hourlyResponse = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&timezone=auto&forecast_days=1`);
        const hourlyData = {
            city: name,
            country,
            hourly: hourlyResponse.data.hourly.time.map((time, i) => ({
                time,
                temperature: hourlyResponse.data.hourly.temperature_2m[i],
                humidity: hourlyResponse.data.hourly.relative_humidity_2m[i],
                precipitation_probability: hourlyResponse.data.hourly.precipitation_probability[i],
                weather_code: hourlyResponse.data.hourly.weather_code[i],
                wind_speed: hourlyResponse.data.hourly.wind_speed_10m[i],
            })),
        };
        res.json(hourlyData);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch hourly forecast" });
    }
});
export default router;
//# sourceMappingURL=weatherRoutes.js.map