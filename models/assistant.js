import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AssistantSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: false
	},
	gender: {
		type: String,
		required: true,
		unique: false,
	},
	color: {
		type: String,
		required: true,
		unique: false
	},
	fileName: {
		type: String,
		required: true,
		unique: false
	},
	profileId: {
		type: Schema.Types.ObjectId,
		ref: 'Profile'
	}
});

export default mongoose.model('Assistant', AssistantSchema);