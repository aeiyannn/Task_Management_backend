import { where } from 'sequelize';
import Task from '../models/task';
import User from '../models/user';
import { Request, Response } from 'express';
import { IUpdateStatus } from '../interface/task';

export const createTask = async (req: Request, res: Response) => {
    try {
        const payload: any = {
            taskTitle: req.body.taskTitle,
            taskDescription: req.body.taskDescription,
            dueDate: req.body.dueDate,
            priority: req.body.priority,
            assignBy: req.body.assignBy,
            assignTo: req.params.id

        };
        console.log(payload, "!@#$ %^&* ()@#$ %^&* ()@#$ %^&* ()")
        let checkuser = await User.findOne({ where: { id: payload.assignTo } })

        if (!checkuser) {
            res.status(500).json(
                { message: "user Not Found" }
            );
        }
        else {
            let newtask = await Task.create(payload)
            res.status(201).json(
                {
                    message: "Task add Successfully",
                    data: newtask
                }
            );
        }
    }

    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
export const getMyTask = async (req: Request, res: Response) => {
    try {
        const getTasks = await Task.findAll({
            where: { assignTo: req.params.id },
            include: [
                { model: User, as: 'sender', attributes: ['id', 'firstName', 'lastName', 'email'] }
            ]
        });
        console.log("!@##########$%678", getTasks)

        if (getTasks.length > 0) {
            res.status(200).json(
                {
                    message: "Your task ",
                    data: getTasks
                }
            );

        }
        else {
            res.status(500).json(
                { message: "Not Task assign" }
            );
        }
    }

    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
export const updateTask = async (req: Request, res: Response) => {
    try {


        const id = req.params.id

        const payload: IUpdateStatus = {
            taskStatus: req.body.taskStatus
        }
        console.log(payload)
        let findId = await Task.findOne({ where: { id } })
        if (findId) {
            await Task.update({ taskStatus: payload.taskStatus }, {
                where: {
                    id: id
                }
            })
            res.status(201).json({
                message: "update successfully"
            })

        }
        else {

            res.status(500).json({
                message: "no Task find"
            })


        }







    }
    catch (err: any) {
        res.status(500).json({
            message: err.message
        })

    }


};
export const getUserTask = async (req: Request, res: Response) => {
    try {
        const getTasks = await Task.findAll({
            where: { assignTo: req.params.id },
            include: [{ model: User, as: 'userInfo', attributes: ['id', 'firstName', 'lastName', 'email'] }]
        });


        if (getTasks.length > 0) {
            const userInfo = {
                id: getTasks[0].userInfo?.id,
                firstName: getTasks[0].userInfo?.firstName,
                lastName: getTasks[0].userInfo?.lastName,
                email: getTasks[0].userInfo?.email,
            }

            const tasks = getTasks.map(v => ({
                taskTitle: v.taskTitle,
                taskDescription: v.taskDescription,
                dueDate: v.dueDate,
                taskStatus: v.taskStatus
            }))
            res.status(500).json(
                {
                    userInfo,
                    Task: tasks
                }
            );

        }
        else {
            res.status(500).json(
                { message: "Not Task assign" }
            );
        }
    }

    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllTask = async (req: Request, res: Response) => {
    try {
        let alltasks = await Task.findAll({
            include: [{
                model: User,
                as: 'userInfo',
                attributes: ['id', 'firstName', 'lastName', 'email']
            }]
        });
        res.status(200).json({ data: alltasks });
    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}