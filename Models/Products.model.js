const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
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
    }
},{timestamps : true})

const virtual = productSchema.virtual('id')
virtual.get(function (){
    return this._id;
})
productSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){ delete ret._id}
    
})
const Product = mongoose.model("Product",productSchema)

module.exports = Product
