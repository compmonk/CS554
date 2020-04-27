import * as collection from "./collection"
import * as Error from 'http-errors';
import {ITask, Task} from "./Task";
import {IComment, Comment} from "./Comment";
import {ObjectID, ObjectId} from "mongodb";

const _ = require('underscore');


class tasks {
    public async create(newTask: ITask): Promise<ITask> {
        const error = Error();
        error.status = 200;
        const errors = {};

        if (newTask === undefined || _.isEmpty(newTask)) {
            errors['task'] = "task object not defined";
            error.http_code = 400
        } else if (typeof newTask !== "object") {
            errors['task'] = "invalid type of task";
            error.http_code = 400
        }

        if (!newTask.hasOwnProperty("title")) {
            errors['title'] = "missing property";
            error.status = 400
        } else if (typeof newTask["title"] !== "string") {
            errors['title'] = "invalid type";
            error.status = 400
        }

        if (!newTask.hasOwnProperty("description")) {
            errors['description'] = "missing property";
            error.status = 400
        } else if (typeof newTask["description"] !== "string") {
            errors['description'] = "invalid type";
            error.status = 400
        }

        if (!newTask.hasOwnProperty("hoursEstimated")) {
            errors['hoursEstimated'] = "missing property";
            error.status = 400
        } else if (typeof newTask["hoursEstimated"] !== "number") {
            errors['hoursEstimated'] = "invalid type";
            error.status = 400
        }

        if (!newTask.hasOwnProperty("completed")) {
            newTask["completed"] = false
        } else if (typeof newTask["completed"] !== "boolean") {
            errors['completed'] = "invalid type";
            error.status = 400
        }

        if (!newTask.hasOwnProperty("comments")) {
            newTask["comments"] = []
        } else if (!Array.isArray(newTask["comments"])) {
            errors['comments'] = "invalid type";
            error.status = 400
        }

        if (error.status !== 200) {
            error.message = JSON.stringify({'errors': errors});
            throw error
        }

        for (let i = 0; i < newTask["comments"].length; i++) {
            if (!newTask["comments"][i].hasOwnProperty("name")) {
                errors['comments.name'] = "missing property";
                error.status = 400
            } else if (typeof newTask["comments"][i]["name"] !== "string") {
                errors['comments.name'] = "invalid type";
                error.status = 400
            }

            if (!newTask["comments"][i].hasOwnProperty("comment")) {
                errors['comments.comment'] = "missing property";
                error.status = 400
            } else if (typeof newTask["comments"][i]["comment"] !== "string") {
                errors['comments.comment'] = "invalid type";
                error.status = 400
            }

            newTask["comments"][i] = new Comment(newTask["comments"][i])
        }

        if (error.status !== 200) {
            error.message = JSON.stringify({'errors': errors});
            throw error
        }

        try {
            newTask = new Task(newTask)
        } catch (e) {
            error.message = e.message;
            error.status = 400;
            throw error
        }

        const tasksCollection = await collection.default.taskCollection();
        const insertInfo = await tasksCollection.insertOne(newTask);

        if (insertInfo.insertedCount === 0) {
            error.message = JSON.stringify({
                'error': "could not create task",
                'object': newTask,
                'errors': errors
            });
            error.status = 400;
            throw error
        }

        const newId = insertInfo.insertedId.toString();
        return await this.get(newId);
    }

    public async get(taskId: string): Promise<ITask> {
        const error = Error();
        error.status = 200;
        const errors = {};


        if (taskId === undefined || taskId === null) {
            errors['id'] = "id is not defined";
            error.http_code = 400
        }

        let taskID: ObjectId = new ObjectID()

        try {
            taskID = new ObjectID(taskId);
        } catch (e) {
            errors['id'] = e.message;
            error.status = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        const tasksCollection = await collection.default.taskCollection();

        let task: ITask = await tasksCollection.findOne({_id: taskID});

        if (task === null) {
            errors['id'] = `task with id ${taskId} doesn't exists`;
            error.status = 404;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        return task;
    }

    public async getAll(takeString: string = "20", skipString: string = "0"): Promise<Array<ITask>> {
        const error = Error();
        error.status = 200;
        const errors = {};

        let take: number = parseInt(takeString);
        if (isNaN(take)) {
            errors['take'] = "take is NaN";
            error.status = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        let skip: number = parseInt(skipString);
        if (isNaN(skip)) {
            errors['skip'] = "skip is NaN";
            error.status = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        take = take < 100 ? take : 100;

        if (take === 0) {
            return []
        }

        const tasksCollection = await collection.default.taskCollection();

        return await tasksCollection.find().limit(take).skip(skip).toArray()
    }

    public async update(taskId: string, updatedTask: ITask, partial: boolean = false): Promise<ITask> {
        const error = Error();
        error.status = 200;
        const errors = {};

        let taskID: ObjectId = new ObjectID();

        try {
            taskID = new ObjectID(taskId);
        } catch (e) {
            errors['id'] = e.message;
            error.status = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        if (updatedTask === undefined || _.isEmpty(updatedTask)) {
            errors['task'] = "task object not defined";
            error.status = 400
        } else if (typeof updatedTask !== "object") {
            errors['task'] = "invalid type of task";
            error.status = 400
        }

        if (!partial && !updatedTask.hasOwnProperty("title")) {
            errors['title'] = "missing property";
            error.status = 400
        } else if (updatedTask.hasOwnProperty("title") && typeof updatedTask["title"] !== "string") {
            errors['title'] = "invalid type";
            error.status = 400
        }

        if (!partial && !updatedTask.hasOwnProperty("description")) {
            errors['description'] = "missing property";
            error.status = 400
        } else if (updatedTask.hasOwnProperty("description") && typeof updatedTask["description"] !== "string") {
            errors['description'] = "invalid type";
            error.status = 400
        }

        if (!partial && !updatedTask.hasOwnProperty("hoursEstimated")) {
            errors['hoursEstimated'] = "missing property";
            error.status = 400
        } else if (updatedTask.hasOwnProperty("hoursEstimated") && typeof updatedTask["hoursEstimated"] !== "number") {
            errors['hoursEstimated'] = "invalid type";
            error.status = 400
        }

        if (!partial && !updatedTask.hasOwnProperty("completed")) {
            errors['completed'] = "missing property";
            error.status = 400
        } else if (updatedTask.hasOwnProperty("completed") && typeof updatedTask["completed"] !== "boolean") {
            errors['completed'] = "invalid type";
            error.status = 400
        }

        if (updatedTask.hasOwnProperty("comments")) {
            delete updatedTask["comments"];
            if (_.keys(updatedTask).length === 0) {
                errors['comments'] = "comments cannot be updated by this operation, try adding or deleting comments";
                error.status = 400
            }
        }

        if (error.status !== 200) {
            error.message = JSON.stringify({'errors': errors});
            throw error
        }

        try {
            const oldTask: ITask = await this.get(taskId);

            const tasksCollection = await collection.default.taskCollection();
            let that = this;

            return await tasksCollection.updateOne({_id: taskID}, {$set: updatedTask})
                .then(async function (updateInfo) {
                    if (updateInfo.modifiedCount === 0) {
                        error.message = JSON.stringify({
                            'error': "could not update task",
                            'object': updatedTask,
                            'errors': errors
                        });
                        error.status = 400;
                        throw error
                    }
                    return await that.get(taskId);
                });
        } catch (e) {
            throw e
        }
    }

    public async addComment(taskId: string, comment: IComment): Promise<ITask> {
        const error = Error();
        error.status = 200;
        const errors = {};

        if (!comment.hasOwnProperty("name")) {
            errors['name'] = "missing property";
            error.status = 400
        } else if (typeof comment["name"] !== "string") {
            errors['name'] = "invalid type";
            error.status = 400
        }

        if (!comment.hasOwnProperty("comment")) {
            errors['comment'] = "missing property";
            error.status = 400
        } else if (typeof comment["comment"] !== "string") {
            errors['comment'] = "invalid type";
            error.status = 400
        }

        let taskID: ObjectId = new ObjectID()

        try {
            taskID = new ObjectID(taskId);
        } catch (e) {
            errors['id'] = e.message;
            error.status = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        comment = new Comment(comment)

        if (error.status !== 200) {
            error.message = JSON.stringify({'errors': errors});
            throw error
        }

        try {
            await this.get(taskId);

            const tasksCollection = await collection.default.taskCollection();
            let that = this
            return await tasksCollection.updateOne({_id: taskID}, {$push: {"comments": comment}})
                .then(async function (updateInfo) {
                    if (updateInfo.modifiedCount === 0) {
                        error.message = JSON.stringify({
                            'error': "could not add comment",
                            'object': comment,
                            'errors': errors
                        });
                        error.status = 400;
                        throw error
                    }
                    return await that.get(taskId);
                });
        } catch (e) {
            throw e
        }
    }

    public async deleteComment(taskId: string, commentId: string): Promise<ITask> {
        const error = Error();
        error.status = 200;
        const errors = {};

        let taskID: ObjectId = new ObjectID()

        try {
            taskID = new ObjectID(taskId);
        } catch (e) {
            errors['id'] = e.message;
            error.status = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        let commentID: ObjectId = new ObjectID()

        try {
            commentID = new ObjectID(commentId);
        } catch (e) {
            errors['commentId'] = "Invalid UUID.";
            error.status = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }

        try {
            let that = this

            await that.get(taskId);

            const tasksCollection = await collection.default.taskCollection();

            return await tasksCollection.updateOne({_id: taskID}, {$pull: {"comments": {"_id": new ObjectID(commentID)}}})
                .then(async function (updateInfo) {
                    if (updateInfo.modifiedCount === 0) {
                        if (updateInfo.matchedCount === 1) {
                            error.message = JSON.stringify({
                                'error': `comment with _id ${commentID} doesn't exist`,
                                'commentId': commentID,
                                'errors': errors
                            });
                            error.status = 404;
                        } else {
                            error.message = JSON.stringify({
                                'error': `Could not Delete comment`,
                                'commentId': commentId,
                                'errors': errors
                            });
                            error.status = 400;
                        }
                        throw error
                    }
                    return await that.get(taskId);
                });
        } catch (e) {
            throw e
        }
    }
}

export default new tasks()