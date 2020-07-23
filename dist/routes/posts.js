"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/auth"));
const posts = [
    {
        username: 'Kyle',
        title: 'Post 1'
    },
    {
        username: 'Jim',
        title: 'Post 2'
    }
];
const route = express_1.Router();
route.get('/posts', auth_1.default, (req, res) => {
    return res.status(200).json({ posts: posts.filter(post => post.username === req.user.name) });
});
exports.default = route;
