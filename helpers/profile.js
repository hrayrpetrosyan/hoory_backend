const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validateSignUpBody = ({ firstName, lastName, email, password, assistant }) => {
	const isEmailInvalid = !email || !emailRegEx.test(email);
	const isPasswordInvalid = !password || !passwordRegEx.test(password);

	const isProfileInvalid = !firstName || !lastName || isEmailInvalid || isPasswordInvalid;
	const isAssistantInvalid = !assistant || !assistant.name || !assistant.color || !assistant.fileName;

	return isProfileInvalid || isAssistantInvalid;
};

export const validateSignInBody = ({ email, password }) => {
	const isEmailInvalid = !email || !emailRegEx.test(email);
	const isPasswordInvalid = !password || !passwordRegEx.test(password);

	return isEmailInvalid || isPasswordInvalid;
};