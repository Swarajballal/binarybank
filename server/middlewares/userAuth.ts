
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
    // console.log('authHeader', authHeader);
    if(authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET as Secret, (err, user) => {
            if (err) {
                // console.log('JWT verification failed:', err);
                return res.status(403).json({
                    message: 'Invalid token',
                });
            }
            req.user = user as UserPayload;
            // console.log('Authenticated User:', req.user);
            next();
        });
    } else {
        return res.sendStatus(401);
    }
};

export { authenticateUser , SECRET};