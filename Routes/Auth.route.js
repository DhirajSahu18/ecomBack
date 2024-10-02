const express = require('express');
const User = require('../Models/User.model');
const bcrypt = require('bcrypt');
const { createUser, updateUser, loginUser } = require('../Controllers/Auth.controller');

const router = express.Router()

router.post("/" , createUser)

router.post("/login", loginUser)

router.patch("/" ,updateUser)


exports.router = router