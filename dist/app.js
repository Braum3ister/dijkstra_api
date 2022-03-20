"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const logger_test_1 = __importDefault(require("./utils/logger.test"));
const cors_1 = __importDefault(require("cors"));
const api_router_1 = __importDefault(require("./routes/api-router"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api", api_router_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    logger_test_1.default.info(`Server listening on Port: ${PORT}`);
    logger_test_1.default.info(`DevSever on: ${process.env.LOCAL_HOST}${process.env.PORT}`);
});
