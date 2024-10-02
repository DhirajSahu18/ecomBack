const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
    value : {
        type : String,
        required : [true , "Value is required"],
    },
    label : {
        type : String,
        required : [true , "label is required"]
    },
},{timestamps : true})

const virtual = brandSchema.virtual('id')
virtual.get(function (){
    return this._id;
})
brandSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){ delete ret._id}
    
})
const Brand = mongoose.model("Brand",brandSchema)

module.exports = Brand
