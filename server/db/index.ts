import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
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

  const User = mongoose.model('User', UserSchema);


  const AccountSchema = new mongoose.Schema({
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
  

const Account = mongoose.model('Account', AccountSchema);

export { User, Account };