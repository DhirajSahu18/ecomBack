const Product = require("../Models/Products.model.js");

const AddProduct = async (req , res) =>{
    try {
        const body = req.body;
    
        const product = new Product(body);
        await product.save()
        res.status(201).json({"message":"Product added successfully" , product})
        
    } catch (error) {
        console.log("Product Adding Error" , error)
        res.status(400).json(error)
    }
    
}

const FetchAllProducts = async (req , res ) =>{
    let query = Product.find({staus : {$ne : "deleted"}})
    let countQry = Product.find({staus : {$ne : "deleted"}})
    if (req.query._sort && req.query._order) {
        query = query.sort({[req.query._sort] : req.query._order})
        countQry = countQry.sort({[req.query._sort] : req.query._order})
    }
    if (req.query.category) {
        query = query.find({category : req.query.category})
        countQry= countQry.find({category : req.query.category})
    }
    if (req.query.brand) {
        query = query.find({brand : req.query.brand})
        countQry = countQry.find({brand : req.query.brand})
    }
    const totalProducts = await countQry.count()
    if (req.query._page && req.query._limit) {
        const itemNum = req.query._limit;
        const pageNum = req.query._page;
        query = query.skip(itemNum*(pageNum-1)).limit(itemNum)
    }

    try {
        const products = await query.exec()
        res.status(200).setHeader("X-Total-Count" , totalProducts).json(products)
        // res.status(200).json(products)
    } catch (error) {
        console.log("Product Fetch error" ,error?.message)
        res.status(400).json(error)
    }
}

const UpdateProduct = async (req, res) => {
    try {
        const body = req.body;
        
        // Use async/await to wait for the update operation to complete
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: body.id },
            body, // You don't need { body: body }
            { new: true } // To return the updated document
        ).select(["-price"]);
        
        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Product Updation Error", error?.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const fetchSelectedProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        console.log("Selected Product fetch failed" , error?.message)
        res.status(404).json(error)
    }
}

module.exports = {AddProduct , FetchAllProducts , UpdateProduct ,fetchSelectedProduct}