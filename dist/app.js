"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const logger_1 = __importDefault(require("./utils/logger"));
const cors_1 = __importDefault(require("cors"));
const apiRouter_1 = __importDefault(require("./routes/apiRouter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api", apiRouter_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger_1.default.info(`Server listening on Port: ${PORT}`);
    logger_1.default.info(`DevSever on: ${process.env.LOCAL_HOST}${process.env.PORT}`);
});
