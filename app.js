import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import profileRoute from './routes/profile';
import assistantRoute from './routes/assistant';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/profile', profileRoute);
app.use('/assistant', assistantRoute);

app.use('', (req, res) => res.status(404).json({ message: 'Not found' }));

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(
	process.env.DB_CONNECT_URL, 
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true 
	}
)
	.then(() => app.listen(process.env.HOST))
	.catch(err => console.log(err));

