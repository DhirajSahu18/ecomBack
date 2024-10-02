const Brand = require("../Models/Brand.model.js");

const fetchAllBrands = async (req , res) =>{
    try {
        const brands = await Brand.find({})
        res.status(200).json(brands)
    } catch (error) {
        console.log("Brand fetching failed" , error?.message)
        res.status(404).json(error)
    }
}

const AddBrand = async (req , res ) =>{
    try {
        const body = req.body;
        const newBrand= new Brand(body)
        await newBrand.save()
        res.status(200).json(newBrand)
    } catch (error) {
        console.log("Brand Creation Error" , error?.message)
        res.status(400).json(error)
    }
}


module.exports = { fetchAllBrands, AddBrand }