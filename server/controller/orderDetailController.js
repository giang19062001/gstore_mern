const {Order,OrderDetail} = require("../modules/module")

const bookController = {
     //add OrderDetail
     addOrderDetail: async (req,res) =>{
        try {
            const newOrderDetail= new OrderDetail(req.body)
            const saveOrderDetail = await newOrderDetail.save()  //lưu vao db
            if(req.body.order){
                const order = Order.findById(req.body.order) //author là id trong obj book bên model
                await order.updateOne({$push : {orderDetail: saveOrderDetail._id}}) //cập nhập vào mảng sách của author bên model
            }
            res.status(200).json(saveOrderDetail)
        } catch (error) {
            res.status(500).json(error)
        }
     },

 
}
module.exports  = bookController