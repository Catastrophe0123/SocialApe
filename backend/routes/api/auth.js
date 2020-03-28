const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const { jwtSecret } = require('../../Config');

//contains the login and signup routes
router.post(
	'/register',
	[
		check('userHandle', 'UserHandle is required').notEmpty(),
		check('email', 'valid email is required').isEmail(),
		check(
			'password',
			'Please enter a password with 5 or more characters'
		).isLength({ min: 5 })
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = new User({
				userHandle: req.body.userHandle,
				email: req.body.email,
				password: req.body.password
			});

			const salt = await bcrypt.genSalt(12);
			console.log(req.body.password, salt);

			user.password = await bcrypt.hash(user.password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, function(
				err,
				token
			) {
				if (err) throw err;
				return res.status(201).json({ token });
			});
		} catch (err) {
			console.error('err is : ', err);
			return res.status(400).json({ error: err.message });
		}
	}
);

// TODO: login route

router.post(
	'/login',
	[
		check('email', 'please enter valid email address').isEmail(),
		check(
			'password',
			'Please enter a password with 5 or more characters'
		).isLength({ min: 5 })
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		//get the username and password

		try {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res
					.status(400)
					.json({ message: 'invalid username or password' });
			}
			const isMatch = await bcrypt.compare(
				req.body.password,
				user.password
			);
			if (isMatch) {
				const payload = {
					user: {
						id: user.id
					}
				};

				jwt.sign(payload, jwtSecret, { expiresIn: 3600 }, function(
					err,
					token
				) {
					if (err) throw err;
					return res.status(200).json({ token });
				});
			} else {
				return res
					.status(400)
					.json({ message: 'Invalid username or password' });
			}
		} catch (err) {
			console.error(err);
			return res.json(err);
		}
	}
);

module.exports = router;
