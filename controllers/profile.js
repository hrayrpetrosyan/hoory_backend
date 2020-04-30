import bcryptjs from 'bcryptjs';

import Profile from '../models/profile';
import Assistant from '../models/assistant';

import { validateSignUpBody, validateSignInBody } from '../helpers/profile';


export const signUp = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const isBodyInvalid = validateSignUpBody(req.body);
	if (isBodyInvalid) return res.status(400).json({ message: 'Invalid field is provided' });
	try {
		const profileExists = await Profile.findOne({ email });
		if (profileExists) return res.status(409).json({ message: 'Profile already exists' });
		const hashedPassword = await bcryptjs.hash(password, 12);
		const profile = new Profile({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});
		const savedProfile = await profile.save();
		
		const { name, color, fileName } = req.body.assistant;
		const assistant = new Assistant({
			profileId: savedProfile._id,
			name,
			color,
			fileName
		});
		await assistant.save();

		const resBody = {
			_id: savedProfile._id,
			firstName: savedProfile.firstName,
			lastName: savedProfile.lastName,
			email: savedProfile.email,
		};
		delete resBody.password;
		res.status(201).json({ profile: resBody });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const signIn = async (req, res) => {
	const { email, password } = req.body;
	const isBodyInvalid = validateSignInBody(req.body);
	if (isBodyInvalid) return res.status(400).json({ message: 'Invalid field is provided' });
	try {
		const profile = await Profile.findOne({ email });
		if (!profile) return res.status(404).json({ message: 'No user was found with the provided email' });
		const doMatch = await bcryptjs.compare(password, profile.password);
		if (!doMatch) return res.status(400).json({ message: 'Password is incorrect!' });

		const resBody = {
			_id: profile._id,
			firstName: profile.firstName,
			lastName: profile.lastName,
			email: profile.email,
		};
		res.status(200).json({ profile: resBody });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};
