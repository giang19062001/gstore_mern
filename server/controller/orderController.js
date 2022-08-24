const {Order,OrderDetail,User,Iphone} = require("../modules/module")

//req là thứ client gửi lên , res là thứ server trả về client

const orderController = {
    //addOrder
    addOrder : async(req,res)=>{
        try {
            const newOrder = new Order(req.body);
            const saveOrder = await newOrder.save();
            res.status(200).json(saveOrder);
            
        } catch (error) {
            res.status(500).json(error) //500 là lỗi server
        } 
    },
    //getAll ORDER
    getAllOrder: async(req,res) =>{
        try {
            const orders = await Order.find()
            //tìm tất cả field của author
            res.status(200).json(orders)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    //get order 
    getOrder: async (req,res) =>{
        try {
            const order = await Order.findById(req.params.id).populate("orderDetail") // lấy trong module
            res.status(200).json(order )
        } catch (error) {
            res.status(500).json(error)

        }
    },
      //get order by user
      getOrderByUser: async (req,res) =>{
        try {
            const order = await Order.find({user:req.params.id}).populate("orderDetail")  // lấy trong module
            res.status(200).json(order )
        } catch (error) {
            res.status(500).json(error)

        }
    },
    //update ORDER
    updateOrder : async (req,res)=>{
        try {
            const order = await Order.findById(req.params.id)
            await order.updateOne({$set:req.body})
            const updateOrder = await Order.findById(req.params.id)
            res.status(200).json(updateOrder);
         } catch (error) {
          res.status(500).json(error)
  
         }
    },

}
module.exports = orderController