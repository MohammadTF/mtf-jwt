"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const route = express_1.Router();
let refreshToks = [];
route.delete('/delete', (req, res) => {
    const bodyReq = req.body;
    refreshToks = refreshToks.filter(tok => tok !== bodyReq.token);
    return res.sendStatus(204);
});
route.post('/token', (req, res) => {
    const body = req.body;
    const refreshToken = body.token;
    if (refreshToken == null)
        return res.sendStatus(401);
    if (!refreshToks.includes(refreshToken))
        return res.sendStatus(403);
    jsonwebtoken_1.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err)
            return res.sendStatus(403);
        const _payload = payload;
        const accessToken = jsonwebtoken_1.sign({ name: _payload.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRY });
        return res.status(200).json({ status: true, data: accessToken, message: '' });
    });
});
route.post('/login', (req, res) => {
    const body = req.body;
    const { username, password } = body;
    const _username = "admin";
    const _password = "admin";
    if (!(username === _username && password === _password))
        return res.sendStatus(401);
    const payload = {
        name: username
    };
    const accessToken = jsonwebtoken_1.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    const refreshToken = jsonwebtoken_1.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    refreshToks.push(refreshToken);
    return res.status(200).json({ status: true, data: { accessToken, refreshToken }, message: '' });
});
exports.default = route;
