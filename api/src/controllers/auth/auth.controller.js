const User = require('../../models/user.model');
const { token } = require('./../v1/token');

//login user /api/v1/login
exports.loginUser = async (req, res, next) => {
	const { username, password } = req.body;
	// console.log('req.body', req.body);
	// return;
	//check if username and password is entered by user
	if (!username || !password) {
		return res.json({
			error: false,
			msg: 'Please enter username and password.',
		});
	}

	//finding user
	const user = await User.findOne({ username }).select('+password');

	if (!user) {
		return res.json({
			msg: 'Please enter correct login detail.',
		});
	}
	//check if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		return res.json({
			msg: 'Invalid username or password.',
		});
	}
	// return res.json({
	//     msg: 'Login.',
	// });
	next(await token(req, res));
};
