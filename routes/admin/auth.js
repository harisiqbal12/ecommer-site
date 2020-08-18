const express = require('express');
const userRepo = require('../../repositories/users');

const singUpTemplate = require('../../views/admin/auth/signup');
const singIntemplate = require('../../views/admin/auth/signin');
const { handleError } = require('./middlewares');
const {
	requireEmail,
	requirePassword,
	requirePasswordConfirmation,
	signEmail,
	signPassword,
} = require('./validators');

const router = express.Router();

router.get('/signup', (req, res) => {
	res.send(singUpTemplate({ req }));
});

// Method on parameters for each task like email validation and etc..
router.post(
	'/signup',
	[requireEmail, requirePassword, requirePasswordConfirmation],
	handleError(singUpTemplate),
	async (req, res) => {
		const { email, password } = req.body;
		const user = await userRepo.create({ email, password });

		req.session.userId = user.id;

		res.redirect('/admin/products');
	}
);

router.get('/signout', (req, res) => {
	req.session = null;

	res.send('logged out')
	res.redirect('/signin');
});

router.get('/signin', (req, res) => {
	res.send(singIntemplate({}));
});

router.post(
	'/signin',
	[signEmail, signPassword],
	handleError(singIntemplate),
	async (req, res) => {
		const { email } = req.body;
		const user = await userRepo.getOneBy({ email });
		req.session.userId = user.id;
		

		res.redirect('/admin/products');
	}
);

module.exports = router;
