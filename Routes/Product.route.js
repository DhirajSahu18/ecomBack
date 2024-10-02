const express = require('express')
const { AddProduct, FetchAllProducts, UpdateProduct, fetchSelectedProduct } = require('../Controllers/Product.controller')

const router = express.Router()

router.post("/" , AddProduct)
router.get("/" , FetchAllProducts)
router.patch("/", UpdateProduct)
router.get("/:id", fetchSelectedProduct)

exports.router = router