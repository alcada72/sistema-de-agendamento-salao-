"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInterceptor = exports.getColor = void 0;
const getColor = (status) => {
    if (status >= 500)
        return "\x1b[31m"; // vermelho
    if (status >= 400)
        return "\x1b[33m"; // amarelo
    if (status >= 200)
        return "\x1b[32m"; // verde
    return "\x1b[0m";
};
exports.getColor = getColor;
const requestInterceptor = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const color = (0, exports.getColor)(res.statusCode);
        console.log(`${color}${res.statusCode}\x1b[0m | ${req.method} | ${req.originalUrl} | ${duration}ms  ${JSON.stringify(req.body)}`);
    });
    next();
};
exports.requestInterceptor = requestInterceptor;
