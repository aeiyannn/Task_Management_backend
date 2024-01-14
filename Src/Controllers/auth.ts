import User from '../models/user';
import { validateAsync } from '../Validator/authValidator';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const secretKey = "ayan12345678"

export const createUser = async (req: Request, res: Response) => {
    try {
        const payload: any = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            userType: req.body.userType
        };
        await validateAsync(req.body)
        let checkuser = await User.findOne({ where: { email: req.body.email } })
        if (!checkuser) {
            const hashPassword = await bcrypt.hash(payload.password, 12)
            payload.password = hashPassword
            const newUser = await User.create(payload);
            res.status(201).json({
                message: "User created Successfully",
                data: newUser
            });
        }
        else {
            res.status(400).json({
                message: "User already exists",
                data: "error"
            });
        }
    }
    catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const payload = {
            email: req.body.email,
            password: req.body.password,
        };
        const checkuser = await User.findOne({ where: { email: req.body.email } })
        if (checkuser) {
            let comparepassword = await bcrypt.compare(payload.password, checkuser.password)
            if (comparepassword) {
                const token = jwt.sign({ id: checkuser.id, email: checkuser.email, userType: checkuser.userType }, secretKey, { expiresIn: '1h' });

                // Save the token to the User model in the database
                await User.update({ token }, { where: { id: checkuser.id } });
                checkuser.token = token
                res.status(201).json({
                    message: "Login Successfully",
                    data: checkuser
                });
            }
            else {
                res.status(500).json({
                    message: "Incorrect password",
                    data: "error"
                });
            }
        }
        else {
            res.status(500).json({
                message: "Invalid Email",
                data: "error"
            });
        }
    } catch (error: any) {
        res.status(500).json({ error: error });
    }
};
