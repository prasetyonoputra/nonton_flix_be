"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
const sequelize_1 = require("sequelize");
function errorMiddleware(err, req, res, next) {
    // Sequelize validation error
    if (err instanceof sequelize_1.ValidationError) {
        const errors = {};
        err.errors.forEach((e) => {
            if (e.path) {
                errors[e.path] = e.message;
            }
        });
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors,
        });
    }
    // Default error
    console.error(err);
    return res.status(500).json({
        success: false,
        message: "Internal server error",
    });
}
