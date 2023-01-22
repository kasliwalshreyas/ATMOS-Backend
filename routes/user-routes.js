require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../config/validation');

router.post('/register', async (req, res) => {
    try {
        // Validate the data before we make a user
        const error  = registerValidation(req.body);
        if (error) return res.status(400).json({ success: false, message: error });

        // Check if the user is already in the database
        const emailExists = await User.findOne({ email: req.body.email });
        if (emailExists) return res.status(400).json({ success: false, message: 'Email already exists' });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.status(200).json({ 
            success: true,
            user: user._id
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        // Validate the data before we make a user
        const error  = loginValidation(req.body);
        if (error) return res.status(400).json({ success: false, message: error });

        // Check if the email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ success: false, message: 'Email is not found' });

        // Check if the password is correct
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) return res.status(400).json({ success: false, message: 'Invalid Password! Password do not match!' });

        // Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({
            success: true,
            token: token,
            user: user
        });
    } catch (err) {
        res.status(400).send({
            success: false,
            message: err
        });
    }
});

module.exports = router;