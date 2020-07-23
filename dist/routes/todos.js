"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
const todos = [];
route.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
route.post('/todo', (req, res, next) => {
    const reqBody = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: reqBody.text
    };
    todos.push(newTodo);
    return res.status(201).json({ todos });
});
route.put('/todo/:todoId', (req, res, next) => {
    const reqBody = req.body;
    const params = req.params;
    const tid = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: new Date().toDateString(), text: reqBody.text };
        return res.status(200).json({ todos });
    }
    return res.status(404).json('Record not found');
});
exports.default = route;
