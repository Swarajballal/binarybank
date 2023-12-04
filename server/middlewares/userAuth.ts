
import jwt, { Secret } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
const SECRET = process.env.SECRET;

interface UserPayload {
    email: string;
    userType: string;
}

interface RequestWithUser extends Request {
    user?: UserPayload;
}

 const authenticateUser = (req: RequestWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET as Secret, (err, user) => {
            if (err) {
                return res.sendStatus(403).json({
                    message: 'Invalid token',
                });
            }
            req.user = user as UserPayload;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

export { authenticateUser , SECRET};