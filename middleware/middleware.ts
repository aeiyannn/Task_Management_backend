import jwt from "jsonwebtoken"
const secretkey = 'ayan12345678'
import User from '../Src/models/user'
import { Request, Response, NextFunction } from "express"

export const authmiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (token) {


            const decoded: any = jwt.verify(token, secretkey);

            // Fetch the token from the User model in the database
            const user = await User.findOne({ where: { id: decoded.id, token } });

            if (!user) {
                throw new Error();
            }
            next();
        }

        else {

            res.status(500).json({

                message: "not token provide"
            })
        }
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}
export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization
        if (token) {
            jwt.sign(token, secretkey)
            const decoded: any = jwt.verify(token, secretkey);
            const user = await User.findOne({ where: { id: decoded.id, token } });
            if (user) {
                if (user.userType === "admin") {
                    next()

                }
                else {

                    res.status(500).json(
                        {
                            message: "You are Not admin"
                        }
                    )
                }


            }
            else {
                res.status(500).json(
                    {
                        message: "User Not find"
                    }
                )
            }
        }
        else {
            res.status(500).json(
                {
                    message: "token not provide"
                }
            )
        }
    }
    catch (e) {

        res.status(500).json(
            {
                message: "in valid Token",
                error: e
            }
        )

    }


}