import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import profileRoute from './routes/profile';
import assistantRoute from './routes/assistant';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/profile', profileRoute);
app.use('/assistant', assistantRoute);

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect(
	'mongodb+srv://hoory-admin:D1WhoKnocks@cluster0-pknxc.mongodb.net/test?retryWrites=true&w=majority', 
	{ 
		useNewUrlParser: true, 
		useUnifiedTopology: true 
	}
)
	.then(() => app.listen('3000'))
	.catch(err => console.log(err));

