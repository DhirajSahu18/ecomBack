const Order = require("../Models/Order.model")


const createOrder = async (req , res ) =>{
    try {
        const body = req.body
        const order = new Order(body)
        const newOrder = await order.save()
        res.status(201).json(newOrder)
    } catch (error) {
        console.log("Order Creation error" , error?.message)
        res.status(500).json(error)
    }
}

const updateOrder = async (req , res ) =>{
    try {
        const body = req.body
        const order = await Order.findByIdAndUpdate(
            {_id : body.id},
            body,
            {new : true}
        )
        res.status(201).json(order)
    } catch (error) {
        console.log("Order updation error" , error?.message)
        res.status(500).json(error)
    }
}

const fetchUserOrder = async (req , res ) =>{
    try {
        const {user} = req.query
        const UserOrders = await Order.find({user :user})
        res.status(201).json(UserOrders)
    } catch (error) {
        console.log("User Orders fetch error :" , error?.message)
        res.status(500).json(error)
    }
}

const fetchAllOrders = async (req , res ) =>{
    let query = Order.find({})
    let countQry = Order.find({})
    if (req.query._sort && req.query._order) {
        query = query.sort({[req.query._sort] : req.query._order})
        countQry = countQry.sort({[req.query._sort] : req.query._order})
    }
    const totalOrders = await countQry.count()
    if (req.query._page && req.query._limit) {
        const itemNum = req.query._limit;
        const pageNum = req.query._page;
        query = query.skip(itemNum*(pageNum-1)).limit(itemNum)
    }
    try {
        const AllOrders = await query.exec()
        res.status(201).setHeader("X-Total-Count" , totalOrders).json(AllOrders)
    } catch (error) {
        console.log("All Orders fetch error :" , error?.message)
        res.status(500).json(error)
    }
}

module.exports = {createOrder , updateOrder , fetchUserOrder , fetchAllOrders}