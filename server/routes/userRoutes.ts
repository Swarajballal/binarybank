import express from 'express';
import { User } from '../db';
import { Request, Response } from 'express';
import { authenticateUser, SECRET } from '../middlewares/userAuth';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

interface UserPayload {
    email: string;
    userType: string;
}

interface RequestWithUser extends Request {
    user?: UserPayload;
}

// Register a new user
router.post('/signup', async(req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        if(!password || email === '' || username === '') {
            return res.status(400).json({ message: 'password, email and username are required' }); 
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            userType: 'customer',
        });
        await newUser.save();

        const token = jwt.sign({ email, userType: newUser.userType }, SECRET as Secret, { expiresIn: '1h' });
        return res.status(200).json({ message: 'User created', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// Login a user
router.post('/login', async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        if(!password || email === '') {
            return res.status(400).json({ message: 'password and email are required' }); 
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(400).json({ message: 'Wrong password' });
        }

        const token = jwt.sign({ email, userType: user.userType }, SECRET as Secret, { expiresIn: '1h' });
        return res.status(200).json({ message: 'User logged in', token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// Get user profile

router.get('/me', authenticateUser, async(req: RequestWithUser, res: Response) => {
    try {
        const user = await User.findOne({ 
            email: req.user?.email,
            userType: req.user?.userType,
         });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        return res.status(200).json({ user });
    } catch ( error ) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

export default router;
