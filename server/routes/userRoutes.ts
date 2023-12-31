import express from 'express';
import { User, Account } from '../db';
import { Request, Response } from 'express';
import { authenticateUser, SECRET } from '../middlewares/userAuth';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

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
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }

        if(!password || email === '' || username === '') {
            return res.status(400).json({ message: 'Username, email, and password are required.' }); 
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

        // Create an account for the new user
        const newAccount = new Account({
            user: newUser._id,
            balance: 0,
            transactions: [],
        });
        await newAccount.save();

        const token = jwt.sign({ email, userType: newUser.userType }, SECRET as Secret, { expiresIn: '1h' });
        return res.status(200).json({ message: 'User and account created', token });
    } catch (error) {
        // console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// Login a user
router.post('/login', async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist Please Signup' });
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
        // console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});


// user deposit 
router.post('/deposit', authenticateUser, async(req: RequestWithUser, res: Response) => {
    const { amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const user = await User.findOne({ email: req.user?.email });
    if (!user || user.userType !== 'customer') {
        return res.status(400).json({ message: 'User does not exist or is not a customer' });
    }
    const account = await Account.findOne({ user: user._id });
    if (!account) {
        return res.status(400).json({ message: 'Account does not exist' });
    }

    const newBalance = account.balance + amount;

    account.transactions.push({
        type: 'deposit',
        status: 'success',
        amount,
        balance: newBalance,
    });

    account.balance = newBalance;
    await account.save();

    return res.status(200).json({ message: `Deposit successful added ${amount} current balance : ${newBalance}`, balance: account.balance });
});

// user withdraw
router.post('/withdraw', authenticateUser, async(req: RequestWithUser, res: Response) => {
    const { amount } = req.body;

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than 0' });
    }

    const user = await User.findOne({ email: req.user?.email });
    if (!user || user.userType !== 'customer') {
        return res.status(400).json({ message: 'User does not exist or is not a customer' });
    }
    const account = await Account.findOne({ user: user._id });
    if (!account) {
        return res.status(400).json({ message: 'Account does not exist' });
    }

    if (account.balance < amount) {
        return res.status(400).json({ message: 'Insufficient Funds' });
    }

    const newBalance = account.balance - amount;

    account.transactions.push({
        type: 'withdrawal',
        status: 'success',
        amount,
        balance: newBalance,
    });

    account.balance = newBalance;
    await account.save();

    return res.status(200).json({ message: 'Withdrawal successful', balance: account.balance });
});



// user transactions

router.get('/transactions', authenticateUser, async(req: RequestWithUser, res: Response) => {

    const user = await User.findOne({ email: req.user?.email});

    if(!user || user.userType !== 'customer') {
        return res.status(400).json({ message: 'User does not exist or is not a customer' });
    }

    const account = await Account.findOne({ user: user._id });

    if(!account) {
        return res.status(400).json({ message: 'Account does not exist' });
    }

    const transactions = account.transactions.map((transaction) => ({
        id: uuidv4(),
        amount: transaction.amount,
        status: 'success',
        email: user.email,
        type: transaction.type,
        date: transaction.date,
        balance: transaction.balance
    }));

    // console.log(`from transaction database:`,transactions);

    return res.status(200).json({ transactions });
})


export default router;
