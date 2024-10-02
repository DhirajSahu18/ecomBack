const express = require('express')
const { fetchAllBrands, AddBrand } = require('../Controllers/Brand.controller')


const router = express.Router()

router.get("/" , fetchAllBrands)
router.post("/" , AddBrand)

exports.router = router