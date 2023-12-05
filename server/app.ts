import  express  from 'express';
import  mongoose  from 'mongoose';
import cors from 'cors';
import  userRoutes  from './routes/userRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

const databaseUrl = process.env.MONGO_URL;

if(!databaseUrl) {
    console.error('DATABASE_URL environment variable not set');
    process.exit(1);
}

mongoose.connect(databaseUrl, { dbName: 'binarybank', })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World your app is working!');
});

app.listen(port, () => console.log(`Server running on port ${port}`));