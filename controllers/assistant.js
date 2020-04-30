import Assistant from '../models/assistant';
import Profile from '../models/profile';

export const createAssistant = async (req, res) => {
	const { name, gender, color, fileName, profileId } = req.body;
	if (!profileId || !name || !gender || !color || !fileName) return res.status(400).json({ message: 'Invalid field is provided' });
	try {
		const profile = await Profile.findById(profileId);
		if (!profile) return res.status(409).json({ message: 'Profile does not exist' });
		const assistant = new Assistant({
			profileId: profile._id,
			name,
			gender,
			color,
			fileName,
		});
		await assistant.save();
		res.status(201).json({ message: 'success' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const updateAssistant = async (req, res) => {
	const { id } = req.params;
	const { name, color, fileName } = req.body;
	if (!name || !color || !fileName) return res.status(400).json({ message: 'Invalid field is provided' });
	if (!id) return res.status(409).json({ message: 'Invalid request' });
	try {
		const updatedAssistant = await Assistant.findByIdAndUpdate(id, { $set: { name, color, fileName }});
		if (!updatedAssistant) return res.status(409).json({ message: 'Can not find the assistant' });
		res.status(201).json({ message: 'success' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const getAssistants = async (req, res) => {
	const { profileId } = req.params;
	const { keyword } = req.query;
	if (!profileId) return res.status(409).json({ message: 'Invalid request' });
	const query = { profileId };
	if (keyword) query.name = { $regex: keyword, $options: 'i'};
	try {
		const assistants = await Assistant.find(query).limit(5);
		res.status(200).json({ assistants });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};

export const deleteAssistant = async (req, res) => {
	const { id } = req.params;
	if (!id) return res.status(409).json({ message: 'Invalid request' });
	try {
		await Assistant.findByIdAndDelete(id);
		res.status(200).json({ message: 'success' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'Server error' });
	}
};