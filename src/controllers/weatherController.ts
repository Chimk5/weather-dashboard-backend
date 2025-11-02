import express from "express";
import { getWeatherData } from "../services/weatherService.js";

export const fetchWeather = async (req: express.Request, res: express.Response) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const data = await getWeatherData(Number(lat), Number(lon));
    res.json(data);
  } catch (error) {
    console.error("Weather fetch error:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
