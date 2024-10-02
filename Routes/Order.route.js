const express = require('express')
const { createOrder, fetchAllOrders, updateOrder, fetchUserOrder } = require('../Controllers/Orders.controller')


const router = express.Router()

router.get("/" , fetchAllOrders)
router.post("/" , createOrder)
router.patch("/" , updateOrder)
router.get("/user" , fetchUserOrder)

exports.router = router