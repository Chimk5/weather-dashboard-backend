"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = require("cors");
const weatherRoutes_js_1 = require("./routes/weatherRoutes.js");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Mount API routes
app.use("/api/weather", weatherRoutes_js_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map