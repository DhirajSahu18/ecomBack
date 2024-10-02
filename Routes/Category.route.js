const express = require('express')
const { fetchAllCategories, AddCategory } = require('../Controllers/Category.controller')

const router = express.Router()

router.get("/" , fetchAllCategories)
router.post("/" , AddCategory)

exports.router = router