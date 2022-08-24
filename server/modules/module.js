const mongoose = require("mongoose")

const iphoneSchema = new mongoose.Schema({
    name : {
        type:String,
        require:true
    },
    price : {
        type: Number
    },
    description:{
        type:String
    },
    display:{
        type:Boolean,
        default:true
    },
    photo: {
        type: [String]
    },

})

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar: {
        type: String,
        default:""
    },
    admin:{
        type:Boolean,
        default:false 
    },
},
{timestamps:true} 
)

const orderSchema = new mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    addressDelivery:{
        type: String,
        required: true
    },
    status:{
        type:Number,
        default:1 
    },
    total:{
        type: Number,
        required: true
    },
    orderDetail: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orderDetail"
    }]
},{timestamps:true})

const orderDetailSchema = new mongoose.Schema({
    iphone:{
       type:mongoose.Schema.Types.ObjectId,
        ref:"Iphone",
    },
    quantity:Number,
    order:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }
} 
)

let Order = mongoose.model("Order",orderSchema);
let OrderDetail = mongoose.model("orderDetail",orderDetailSchema)
let Iphone = mongoose.model("Iphone", iphoneSchema);
let User = mongoose.model("User", userSchema);



module.exports = {Iphone,User,Order,OrderDetail};