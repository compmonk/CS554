const MUUID = require('uuid-mongodb');
const _ = require('underscore');

const collections = require("./collection");

const tasks = collections.tasks;

async function create(newTask) {
    const error = new Error();
    error.http_code = 200;
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
        error.http_code = 400
    } else if (typeof newTask["title"] !== "string") {
        errors['title'] = "invalid type";
        error.http_code = 400
    }

    if (!newTask.hasOwnProperty("description")) {
        errors['description'] = "missing property";
        error.http_code = 400
    } else if (typeof newTask["description"] !== "string") {
        errors['description'] = "invalid type";
        error.http_code = 400
    }

    if (!newTask.hasOwnProperty("hoursEstimated")) {
        errors['hoursEstimated'] = "missing property";
        error.http_code = 400
    } else if (typeof newTask["hoursEstimated"] !== "number") {
        errors['hoursEstimated'] = "invalid type";
        error.http_code = 400
    }

    if (!newTask.hasOwnProperty("completed")) {
        newTask["completed"] = false
    } else if (typeof newTask["completed"] !== "boolean") {
        errors['completed'] = "invalid type";
        error.http_code = 400
    }

    if (!newTask.hasOwnProperty("comments")) {
        newTask["comments"] = []
    } else if (!Array.isArray(newTask["comments"])) {
        errors['comments'] = "invalid type";
        error.http_code = 400
    }

    if (error.http_code !== 200) {
        error.message = JSON.stringify({'errors': errors});
        throw error
    }

    for (let i = 0; i < newTask["comments"].length; i++) {
        if (!newTask["comments"][i].hasOwnProperty("name")) {
            errors['comments.name'] = "missing property";
            error.http_code = 400
        } else if (typeof newTask["comments"][i]["name"] !== "string") {
            errors['comments.name'] = "invalid type";
            error.http_code = 400
        }

        if (!newTask["comments"][i].hasOwnProperty("comment")) {
            errors['comments.comment'] = "missing property";
            error.http_code = 400
        } else if (typeof newTask["comments"][i]["comment"] !== "string") {
            errors['comments.comment'] = "invalid type";
            error.http_code = 400
        }

        newTask["comments"][i]._id = MUUID.v4()
    }

    if (error.http_code !== 200) {
        error.message = JSON.stringify({'errors': errors});
        throw error
    }

    newTask._id = MUUID.v4();

    const tasksCollection = await tasks();

    const insertInfo = await tasksCollection.insertOne(newTask);

    if (insertInfo.insertedCount === 0) {
        error.message = JSON.stringify({
            'error': "could not create task",
            'object': newTask,
            'errors': errors
        });
        error.http_code = 400;
        throw error
    }

    const newId = insertInfo.insertedId.toString();

    return await get(newId);
}

async function get(taskId) {
    const error = new Error();
    error.http_code = 200;
    const errors = {};

    if (taskId === undefined || taskId === null) {
        errors['id'] = "id is not defined";
        error.http_code = 400
    }

    if (typeof taskId === "string") {
        try {
            taskId = MUUID.from(taskId);
        } catch (e) {
            errors['id'] = e.message;
            error.http_code = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }
    } else {
        try {
            taskId = MUUID.from(taskId);
        } catch (e) {
            errors['id'] = "id is not defined";
            error.http_code = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }
    }

    const tasksCollection = await tasks();

    let task = await tasksCollection.findOne({_id: taskId});

    if (task === null) {
        errors['id'] = `task with id ${taskId} doesn't exists`;
        error.http_code = 404;
        error.message = JSON.stringify({
            errors: errors
        });
        throw error
    }

    task._id = MUUID.from(task._id).toString();
    for (let i = 0; i < task["comments"].length; i++) {
        task["comments"][i]._id = MUUID.from(task["comments"][i]._id).toString()
    }

    return task;
}

async function getAll(take = 20, skip = 0) {
    const error = new Error();
    error.http_code = 200;
    const errors = {};

    take = parseInt(take);
    if (isNaN(take)) {
        errors['take'] = "take is NaN";
        error.http_code = 400;
        error.message = JSON.stringify({
            errors: errors
        });
        throw error
    }

    skip = parseInt(skip);
    if (isNaN(skip)) {
        errors['skip'] = "skip is NaN";
        error.http_code = 400;
        error.message = JSON.stringify({
            errors: errors
        });
        throw error
    }

    take = take < 100 ? take : 100;
    const tasksCollection = await tasks();

    let tasksList = await tasksCollection.find().limit(take).skip(skip).toArray();

    for (let i = 0; i < tasksList.length; i++) {
        tasksList[i]._id = MUUID.from(tasksList[i]._id).toString();
        for (let j = 0; j < tasksList[i]["comments"].length; j++)
            tasksList[i]["comments"][j]._id = MUUID.from(tasksList[i]["comments"][j]._id).toString()
    }

    return tasksList
}

async function update(taskId, updatedTask, partial = false) {
    const error = new Error();
    error.http_code = 200;
    const errors = {};

    if (updatedTask === undefined || _.isEmpty(updatedTask)) {
        errors['task'] = "task object not defined";
        error.http_code = 400
    } else if (typeof updatedTask !== "object") {
        errors['task'] = "invalid type of task";
        error.http_code = 400
    }

    if (!partial && !updatedTask.hasOwnProperty("title")) {
        errors['title'] = "missing property";
        error.http_code = 400
    } else if (updatedTask.hasOwnProperty("title") && typeof updatedTask["title"] !== "string") {
        errors['title'] = "invalid type";
        error.http_code = 400
    }

    if (!partial && !updatedTask.hasOwnProperty("description")) {
        errors['description'] = "missing property";
        error.http_code = 400
    } else if (updatedTask.hasOwnProperty("description") && typeof updatedTask["description"] !== "string") {
        errors['description'] = "invalid type";
        error.http_code = 400
    }

    if (!partial && !updatedTask.hasOwnProperty("hoursEstimated")) {
        errors['hoursEstimated'] = "missing property";
        error.http_code = 400
    } else if (updatedTask.hasOwnProperty("hoursEstimated") && typeof updatedTask["hoursEstimated"] !== "number") {
        errors['hoursEstimated'] = "invalid type";
        error.http_code = 400
    }

    if (!partial && !updatedTask.hasOwnProperty("completed")) {
        errors['completed'] = "missing property";
        error.http_code = 400
    } else if (updatedTask.hasOwnProperty("completed") && typeof updatedTask["completed"] !== "boolean") {
        errors['completed'] = "invalid type";
        error.http_code = 400
    }

    if (updatedTask.hasOwnProperty("comments")) {
        delete updatedTask["comments"];
        if (_.keys(updatedTask).length === 0) {
            errors['comments'] = "comments cannot be updated by this operation, try adding or deleting comments";
            error.http_code = 400
        }
    }

    if (error.http_code !== 200) {
        error.message = JSON.stringify({'errors': errors});
        throw error
    }

    try {
        const oldTask = await get(taskId);

        const tasksCollection = await tasks();

        return await tasksCollection.updateOne({_id: MUUID.from(taskId)}, {$set: updatedTask})
            .then(async function (updateInfo) {
                if (updateInfo.modifiedCount === 0) {
                    error.message = JSON.stringify({
                        'error': "could not update task",
                        'object': updatedTask,
                        'errors': errors
                    });
                    error.http_code = 400;
                    throw error
                }
                return await get(taskId);
            });
    } catch (e) {
        throw e
    }
}

async function addComment(taskId, comment) {
    const error = new Error();
    error.http_code = 200;
    const errors = {};

    if (!comment.hasOwnProperty("name")) {
        errors['name'] = "missing property";
        error.http_code = 400
    } else if (typeof comment["name"] !== "string") {
        errors['name'] = "invalid type";
        error.http_code = 400
    }

    if (!comment.hasOwnProperty("comment")) {
        errors['comment'] = "missing property";
        error.http_code = 400
    } else if (typeof comment["comment"] !== "string") {
        errors['comment'] = "invalid type";
        error.http_code = 400
    }

    comment["_id"] = MUUID.v4();

    if (error.http_code !== 200) {
        error.message = JSON.stringify({'errors': errors});
        throw error
    }

    try {
        await get(taskId);

        const tasksCollection = await tasks();

        return await tasksCollection.updateOne({_id: MUUID.from(taskId)}, {$push: {"comments": comment}})
            .then(async function (updateInfo) {
                if (updateInfo.modifiedCount === 0) {
                    error.message = JSON.stringify({
                        'error': "could not add comment",
                        'object': comment,
                        'errors': errors
                    });
                    error.http_code = 400;
                    throw error
                }
                return await get(taskId);
            });
    } catch (e) {
        throw e
    }
}

async function deleteComment(taskId, commentId) {
    const error = new Error();
    error.http_code = 200;
    const errors = {};

    if (typeof commentId === "string") {
        try {
            commentId = MUUID.from(commentId);
        } catch (e) {
            errors['commentId'] = e.message;
            error.http_code = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }
    } else {
        try {
            commentId = MUUID.from(commentId);
        } catch (e) {
            errors['commentId'] = "commentId is not defined";
            error.http_code = 400;
            error.message = JSON.stringify({
                errors: errors
            });
            throw error
        }
    }

    try {
        await get(taskId);

        const tasksCollection = await tasks();

        return await tasksCollection.updateOne({_id: MUUID.from(taskId)}, {$pull: {"comments": {"_id": commentId}}})
            .then(async function (updateInfo) {
                if (updateInfo.modifiedCount === 0) {
                    if (updateInfo.matchedCount === 1) {
                        error.message = JSON.stringify({
                            'error': `comment with _id ${MUUID.from(commentId).toString()} doesn't exist`,
                            'commentId': MUUID.from(commentId).toString(),
                            'errors': errors
                        });
                        error.http_code = 404;
                    } else {
                        error.message = JSON.stringify({
                            'error': `Could not Delete comment`,
                            'commentId': MUUID.from(commentId).toString(),
                            'errors': errors
                        });
                        error.http_code = 400;
                    }
                    throw error
                }
                return await get(taskId);
            });
    } catch (e) {
        throw e
    }
}

module.exports = {
    create,
    get,
    getAll,
    update,
    addComment,
    deleteComment
};