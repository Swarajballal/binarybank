import mongoose from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  userType: string;
}

interface ITransaction {
  type: string;
  amount: number;
  date?: Date;
}

interface IAccount {
  user: mongoose.Schema.Types.ObjectId;
  balance: number;
  transactions: ITransaction[];
}

interface IUserDoc extends IUser, Document {}
interface IAccountDoc extends IAccount, Document {}

const UserSchema = new mongoose.Schema<IUserDoc>({
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      enum: ['customer', 'banker'],
      required: true
    }
  });

  const User = mongoose.model<IUserDoc>('User', UserSchema);


  const AccountSchema = new mongoose.Schema<IAccountDoc>({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    balance: {
      type: Number,
      default: 0
    },
    transactions: [{
      type: {
        type: String,
        enum: ['deposit', 'withdrawal']
      },
      amount: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }]
  });
  

const Account = mongoose.model<IAccountDoc>('Account', AccountSchema);

export { User, Account };