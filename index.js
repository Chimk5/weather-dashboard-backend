import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Example test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// ✅ Example API route for weather
app.get("/api/weather", (req, res) => {
  res.json({ message: "Sample weather data endpoint!" });
});

// ✅ Railway or local port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
