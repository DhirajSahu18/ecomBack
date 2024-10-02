// Modular Imports
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const dotenv = require('dotenv')


// Functional Imports
const Connection = require('./db.js')
const productRoutes = require('./Routes/Product.route.js')
const BrandRoutes = require('./Routes/Brand.route.js')
const CategoryRoutes = require('./Routes/Category.route.js')
const cartRoutes = require('./Routes/Cart.route.js')
const authRoutes = require('./Routes/Auth.route.js')
const orderRoutes = require('./Routes/Order.route.js')

// Configurations
// dotenv.config()
const app = express();
app.use(express.json())
app.use(cors({
    exposedHeaders : ['X-Total-Count']
}))


// Database connection
Connection()


const port =  process.env.PORT || 8080;
app.listen(port , ()=>{
    console.log(`Server running on port ${port}`)
})

// Main Routes
app.use("/products" , productRoutes.router)
app.use("/brands" , BrandRoutes.router)
app.use("/categories" , CategoryRoutes.router)
app.use("/cart" , cartRoutes.router)
app.use("/auth" , authRoutes.router)
app.use("/orders" , orderRoutes.router)