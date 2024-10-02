const mongoose = require('mongoose');
const Category = require("../Models/Category.model.js");


const fetchAllCategories = async (req , res) =>{
    try {
        const Categories = await Category.find({})
        res.status(200).json(Categories)
    } catch (error) {
        console.log("Category fetching failed" , error?.message)
        res.status(404).json(error)
    }
}

const AddCategory = async (req , res ) =>{
    try {
        const body = req.body;
        const newCategory = new Category(body)
        await newCategory.save()
        res.status(200).json(newCategory)
    } catch (error) {
        console.log("Category Creation Error" , error?.message)
        res.status(400).json(error)
    }
}

module.exports = { fetchAllCategories, AddCategory}