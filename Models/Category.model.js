const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    value : {
        type : String,
        required : [true , "Value is required"],
    },
    label : {
        type : String,
        required : [true , "label is required"]
    },
},{timestamps : true})

const virtual = categorySchema.virtual('id')
virtual.get(function (){
    return this._id;
})
categorySchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){ delete ret._id}
    
})
const Category = mongoose.model("Category",categorySchema)

module.exports = Category
