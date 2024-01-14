import User from '../models/user';
import { Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response) => {
    try {
        let allusers = await User.findAll()
        res.status(201).json({ data: allusers });



    }
    catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
