"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const path_1 = __importDefault(require("path"));
require("./models/index.model");
const app = (0, express_1.default)();
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.use(express_1.default.json());
app.use("/api", routes_1.default);
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
