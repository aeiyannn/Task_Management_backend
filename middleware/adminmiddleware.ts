import jwt from "jsonwebtoken";
import User from "../Src/models/user";
const secretKey = "ayan12345678"
import { Request, Response, NextFunction } from "express";



const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization
        if (token) {
            jwt.sign(token, secretKey)
            const decoded: any = jwt.verify(token, secretKey);
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

export default adminMiddleware