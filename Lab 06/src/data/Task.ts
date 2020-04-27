import {IComment} from "./Comment";
import {ObjectId, ObjectID} from "mongodb"

export interface ITask {
    _id: ObjectId,
    title: string,
    description: string,
    hoursEstimated: number,
    completed?: boolean,
    comments: Array<IComment>
}

export class Task implements ITask {
    _id: ObjectId;
    title: string;
    description: string;
    hoursEstimated: number;
    completed: boolean;
    comments: Array<IComment>

    constructor(task: ITask) {
        this._id = new ObjectID()
        this.title = task.title
        this.description = task.description
        this.hoursEstimated = task.hoursEstimated
        this.completed = task.completed || false
        this.comments = task.comments || []
    }
}