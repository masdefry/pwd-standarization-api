"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const responseHandler = ({ res, status, data, message, error }) => {
    return res.status(status || 200).send({
        error: error || false,
        message,
        data: data || null,
    });
};
exports.responseHandler = responseHandler;
