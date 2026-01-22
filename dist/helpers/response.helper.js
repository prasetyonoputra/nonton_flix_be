"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.error = exports.success = void 0;
const success = (res, data, message, status = 200) => {
    return res.status(status).json({
        status: "success",
        message: message || null,
        data,
    });
};
exports.success = success;
const error = (res, message, status = 400) => {
    return res.status(status).json({
        status: "error",
        message,
        data: null,
    });
};
exports.error = error;
const notFound = (res, message = "Not Found") => {
    return res.status(404).json({
        status: "error",
        message,
        data: null,
    });
};
exports.notFound = notFound;
