const { check } = require('express-validator');
const userRepo = require('../../repositories/users');

module.exports = {
	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Invalid Email')
		.custom(async (email) => {
			const existingUser = await userRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('Email in use');
			}
		}),
	requirePassword: check('password')
		.trim()
		.isLength({ min: 4, max: 12 })
		.withMessage('Must be between 4 and 20 characters'),
	requirePasswordConfirmation: check('passwordConfirmation')
		.trim()
		.isLength({ min: 4, max: 12 })
		.withMessage('Must be between 4 and 20 characters')
		.custom((passwordConf, { req }) => {
			if (passwordConf !== req.body.password) {
				throw new Error('Password must match');
			} else {
				return true;
			}
			console.log('function worked');
		}),
	signEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('must provide a valid email')
		.custom(async (email) => {
			const user = await userRepo.getOneBy({ email });

			if (!user) {
				throw new Error('email not found');
			} else {
				true;
			}
		}),
	signPassword: check('password')
		.trim()
		.custom(async (password, { req }) => {
			const user = await userRepo.getOneBy({ email: req.body.email });

			if (!user) {
				throw new Error('invalid password');
			} else {
				true;
			}

			const validator = await userRepo.comparePassword(
				user.password,
				password
			);

			if (!validator) {
				throw new Error('Invalid Password');
			} else {
				true;
			}
		}),
	requireTitle: check('title')
		.trim()
		.isLength({ min:5, max:20 })
		.withMessage('Invalid Title'),

	requirePrice: check('price')
		.trim()
		.toFloat()
		.isFloat({ min: 1 })
		.withMessage('Invalid price'),
};
