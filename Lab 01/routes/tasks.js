const express = require("express");
const router = express.Router();

const tasks = require('../data/tasks');

router.get("/", async (request, response) => {
    try {
        const tasksList = await tasks.getAll(request.query.take, request.query.skip);
        response.json(tasksList);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

router.get("/:id", async (request, response) => {
    try {
        const task = await tasks.get(request.params.id);
        response.json(task);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

router.post("/", async (request, response) => {
    try {
        const task = await tasks.create(request.body);
        response.status(201).json(task);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

router.put("/:id", async (request, response) => {
    try {
        const task = await tasks.update(request.params.id, request.body);
        response.json(task);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

router.patch("/:id", async (request, response) => {
    try {
        const task = await tasks.update(request.params.id, request.body, true);
        response.json(task);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

router.post("/:id/comments", async (request, response) => {
    try {
        const task = await tasks.addComment(request.params.id, request.body);
        response.status(201).json(task);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

router.delete("/:taskId/:commentId", async (request, response) => {
    try {
        const task = await tasks.deleteComment(request.params.taskId, request.params.commentId);
        response.status(204).json(task);
    } catch (e) {
        response.setHeader('content-type', 'application/json');
        response.status(e.http_code).send(e.message)
    }
});

module.exports = router;