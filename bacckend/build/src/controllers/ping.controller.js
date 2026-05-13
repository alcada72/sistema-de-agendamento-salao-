"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pingPrivate = exports.ping = void 0;
const ping = (req, res) => {
    res.status(200).json({ pong: true });
};
exports.ping = ping;
const pingPrivate = (req, res) => {
    res.status(200).json({ pong: true });
};
exports.pingPrivate = pingPrivate;
