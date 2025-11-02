import express from "express";
import cors from "cors";
import weatherRoutes from "./routes/weatherRoutes.js";
const app = express();
app.use(cors());
app.use(express.json());
// ✅ Mount API routes
app.use("/api/weather", weatherRoutes);
export default app;
//# sourceMappingURL=app.js.map