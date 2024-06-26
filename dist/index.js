"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const port = 5000;
const routers_1 = __importDefault(require("./routers"));
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Dashboard API</h1>');
});
app.use(routers_1.default);
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        error: true,
        message: err.message || 'Something Wrong!',
        data: { isExpiryToken: err.isExpiryToken } || null
    });
});
app.listen(port, () => {
    console.log(`[SERVER] Server Running on Port ${port}`);
});
