const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email : {
        type : String,
        required : [true , "email is required"],
    },
    password : {
        type : String,
        required : [true , "password is required"]
    },
    Addresses : {
        type : [mongoose.Schema.Types.Mixed]
    },
    role : {
        type : String,
        default : "user"
    },
    name : {
        type : String
    },
},{timestamps : true})

const virtual = userSchema.virtual('id')
virtual.get(function (){
    return this._id;
})
userSchema.set('toJSON',{
    virtuals : true,
    versionKey : false,
    transform : function(doc, ret){ delete ret._id}
    
})
const User = mongoose.model("User",userSchema)

module.exports = User
