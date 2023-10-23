const otpGenerator = require("otp-generator");
const User = require("../modules/user");
const Otp = require("../modules/otp");
const bcrypt = require("bcrypt")
const Profile = require("../modules/profile");
const jwt = require("jsonwebtoken");
const { mailSender } = require("../util/mailSender");
const passwordUpdated=require("../templates/passwordUpdate")
require("dotenv").config()



exports.sendOtp = async (req, res) => {
	try {

		const { email } = req.body;

		if (!email) {
			return res.json(
				{
					message: "please enter email"
				}
			)
		}


		const userPresent = await User.findOne({ email })

		if (userPresent) {
			return res.json({
				success:false,
				message: "user allready present"
			})
		}
		let otp = otpGenerator.generate(6,
			{
				upperCaseAlphabets: false,
				lowerCaseAlphabets: false,
				specialChars: false
			})

		let uniqueOtp = await Otp.findOne({ otp })

		if (uniqueOtp) {
			otp = otpGenerator.generate(6,
				{
					upperCaseAlphabets: false,
					lowerCaseAlphabets: false,
					specialChars: false
				})
			uniqueOtp = await Otp.findOne({ otp })
		}
		if (otp) {
			console.log(otp);
			res.json(
				{
					success: true,
					message: "otp generate sucessfully",
					data: otp
				}
			)
		}


		const saveOtp = await Otp.create({ email, otp });
		if (!saveOtp) {
			console.log("otp not stored")
		}




	}

	catch (e) {
		res.json(
			{
				 success:false,
				message: e.message
			}
		)
	}
}

// signup



// Signup Controller for Registering USers

exports.signup = async (req, res) => {
	try {
		console.log("hello")
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!accountType ||
			!otp
		) {
			return res.json({
				success: false,
				message: "All Fields are required",
			});
		}
		// console.log(password,confirmPassword);
		// Check if password and confirm password match
		// console.log(password,confirmPassword)
		if (password !== confirmPassword) {
			return res.json({
				success: false,
				message:
					"Password dosent match",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.json({
				success: false,
				message: "User allready register",
			});
		}

		// Find the most recent OTP for the email
		const response = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.json({
				success: false,
				message: "The OTP is expire",
			});
		} 
		else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		console.log(profileDetails._id);

		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			accountType: accountType,
			additionalDetails:profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.json({
			success: false,
			message: error.message,
		});
	}
};

// Login controller for authenticating users
exports.login = async (req, res) => {
	try {

		// Get email and password from request body
		const { email, password } = req.body;

		// Check if email or password is missing

		if (!email || !password) {
			// Return 400 Bad Request status code with error message
			return res.status(400).json({
				success: false,
				message: `Please Fill up All the Required Fields`,
			});
		}

		// Find user with provided email
		const user = await User.findOne({ email }).populate("additionalDetails").exec();

		// If user not found with provided email
		if (!user) {
			// Return 401 Unauthorized status code with error message
			return res.json({
				success: false,
				message: `User not register`,
			});
		}

		// Generate JWT token and Compare Password
		if (await bcrypt.compare(password, user.password)) {
			const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.SECRET_KEY,
				{
					expiresIn: "24h",
				}
			);

			// Save token to user document in database
			user.token = token;
			user.password = undefined;
			// Set cookie for token and return success response
			const options = {
				expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			res.cookie("token", token, options).status(200).json({
				success: true,
				token,
				user,
				message: `User Login Success`,
			});
		} else {
			return res.json({
				success: false,
				message: `Password is incorrect`,
			});
		}
	} catch (error) {
		console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};



exports.changePassword = async (req, res) => {
	const { email, currentPassword, newPassword, confirmPassword } = req.body;

	if (!email || !currentPassword) {
		return res.json(
			{
				message: "plsease enter all feileds"
			}
		)
	}

	const userPresent = await User.findOne({ email })
	if (!userPresent) {
		return res.json(
			{
				mesage: "user not exist"
			}
		)
	}

	if (!bcrypt.compare(currentPassword, userPresent.password)) {
		res.json({
			success:false,
			message: "current passowrd does not match"
		})
	}

	if (newPassword !== confirmPassword) {
		return res.json(
			{
				message: "confirm password doen not match"
			}
		)
	}

	const hashPassword = bcrypt.hash(newPassword, 10);

	await User.findByIdAndUpdate({ email }, { password: hashPassword });

	res.json({
		message: "password update sucsessfully"
	})

	 const body=passwordUpdated(`${userPresent.firtName}${" "}${userPresent.lastName}`,userPresent.lastName)
	mailSender(email,body,"password update succsesfully")

}