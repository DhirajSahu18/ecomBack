const express = require('express')
const { AddtoCart, fetchUserCart, deleteCartItem, updateCart, deleteUserCartItem } = require('../Controllers/Cart.controller')
const Cart = require('../Models/Cart.model')
const router = express.Router()

router.post("/", AddtoCart)
router.get("/", fetchUserCart)
router.delete("/:id", deleteCartItem)
router.patch("/" , updateCart)
router.delete("/user/:id" , deleteUserCartItem)

exports.router = router