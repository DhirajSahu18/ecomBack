const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    title : {
        type : String,
        required : [true , "Title is required"],
    },
    description : {
        type : String,
        required : [true , "Description is required"]
    },
    price : {
        type : Number,
        required : [true , "Price is required"],
        min : 0
    },
    discountPercentage : {
        type : Number,
        required : [true , "Discount Percentage is required"],
        default : 0,
        min : 0,
        max : 100
    },
    rating : {
        type : Number,
        required : true,
        default : 0
    },
    stock : {
        type : Number,
        required : [true , "Stock is required"],
        default : 0,
        min : 0,
    },
    brand : {
        type : String,
        required : [true , "Brand is required"]
    },
    category : {
        type : String,
        required : [true , "Brand is required"]
    },
    thumbnail : {
        type : String,
        required : [true , "Brand is required"]
    },
    images : [
        {
            type : String
        }
    ],
    status : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        default : 1
    },
    productId : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    }
},{timestamps : true})

const virtual = cartSchema.virtual('id')
virtual.get(function (){
    return this._id;
})
cartSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){ delete ret._id}
    
})
const Cart = mongoose.model("Cart",cartSchema)

module.exports = Cart
