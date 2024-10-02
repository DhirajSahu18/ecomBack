const User = require("../Models/User.model");
const bcrypt = require('bcrypt');

const createUser = async (req , res)=>{
    try {
        const body = req.body;
        hashedPassword = await bcrypt.hash(body.password , 10)
        const user = new User({...body , password : hashedPassword})
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        console.log("User creation error" , error?.message)
        res.status(500).json(error)
    }
}

const  loginUser = async (req , res) =>{
    try {
        const body = req.body;
        const user = await User.findOne({email : body.email})
        if (!user) {
            return res.status(404).json({message : "Invalid Credentials"})        
        }
        // if (user.password !== body.password) {
        const passCheck = await bcrypt.compare(body.password , user.password)
        if (!passCheck) {
            return res.status(400).json({message : "Invalid Credentials"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.log("Login Error : " , error?.message)
        res.status(500).json({message :"Internal server error"})
    }
}

const updateUser = async (req , res )=>{
    try {
        const body = req.body
        const updatedUser = await User.findOneAndUpdate(
            {_id : body.id},
            body ,
            { new : true}).select('-password ')
        if (!updatedUser) {
            return res.status(404).json({message : "User not found"})
        }
        return res.status(200).json(updatedUser)
    } catch (error) {
        console.log("User updation error" , error?.message)
        return res.status(500).json(error)
    }
}

module.exports = { createUser , updateUser , loginUser}