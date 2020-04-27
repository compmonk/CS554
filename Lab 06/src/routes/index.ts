import {Request, Response} from 'express';
import tasks from "../data/tasks";

export class Routes {
    public routes(app): void {
        app.route("/api/tasks/").get(async (request: Request, response: Response) => {
            try {
                const tasksList = await tasks.getAll(request.query.take ? `${request.query.take}` : "20",
                    request.query.skip ? `${request.query.skip}` : "0");
                response.json(tasksList);
            } catch (e) {
                response.setHeader('content-type', 'application/json');
                response.status(e.status).send(e.message)
            }
        });

        app.route("/api/tasks/:id").get(async (request: Request, response: Response) => {
            try {
                const task = await tasks.get(`${request.params.id}`);
                response.json(task);
            } catch (e) {
                response.setHeader('content-type', 'application/json');
                response.status(e.status).send(e.message)
            }
        });

        app.route("/api/tasks/").post(async (request: Request, response: Response) => {
            try {
                const task = await tasks.create(request.body);
                response.status(201).json(task);
            } catch (e) {
                response.setHeader('content-type', 'application/json');
                response.status(e.status).send(e.message)
            }
        });

        app.route("/api/tasks/:id").put(async (request: Request, response: Response) => {
            try {
                const task = await tasks.update(`${request.params.id}`, request.body);
                response.json(task);
            } catch (e) {
                response.setHeader('content-type', 'application/json');
                response.status(e.status).send(e.message)
            }
        });

        app.route("/api/tasks/:id").patch(async (request: Request, response: Response) => {
            try {
                const task = await tasks.update(`${request.params.id}`, request.body, true);
                response.json(task);
            } catch (e) {
                response.setHeader('content-type', 'application/json');
                response.status(e.status).send(e.message)
            }
        });

        app.route("/api/tasks/:id/comments").post(async (request: Request, response: Response) => {
            try {
                const task = await tasks.addComment(`${request.params.id}`, request.body);
                response.status(201).json(task);
            } catch (e) {
                response.setHeader('content-type', 'application/json');
                response.status(e.status).send(e.message)
            }
        });

        app.route("/api/tasks/:taskId/:commentId").delete(async (request: Request, response: Response) => {
            try {
                const task = await tasks.deleteComment(`${request.params.taskId}`, `${request.params.commentId}`);
                response.status(204).json(task);
            } catch (e) {
                response.setHeader('content-type', 'application/json');
                response.status(e.status).send(e.message)
            }
        });
    }
}