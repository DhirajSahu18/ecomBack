const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    products : [{
        type : mongoose.Schema.Types.Mixed,
        required : true
    }],
    address : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    },
    totalAmount : {
        type : Number ,
        required : [true , "Total amount is required"]
    },
    paymentMethod : {
        type : String,
        required : true
    },
    status :{
        type : String,
        required : true,
        default : "Processing",
        enum : ['Processing' , 'Dispatched' , 'Delivered' , 'Cancelled']
    }

},{timestamps : true})

const virtual = orderSchema.virtual('id')
virtual.get(function (){
    return this._id;
})
orderSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){ delete ret._id}
    
})
const Order = mongoose.model("Order",orderSchema)

module.exports = Order
