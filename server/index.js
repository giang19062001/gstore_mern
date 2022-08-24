const express = require("express")
const app = express();
const cors = require("cors");
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const socketJs = require("./socket/socket")

dotenv.config()
const http = require("http");
const server = http.createServer(app);

    const socketIo = require("socket.io")(server, {
            cors: {
                origin: process.env.REACT_LOCALHOST
            }
    })
  socketIo.on("connection", (socket) => { 
    console.log("Client connected (socket.id) : "+socket.id);   
       socketJs(socket,socket.id)
   })


const iphoneRouter = require("./router/iphone")
const authRouter = require("./router/user")
const orderRouter = require("./router/order")
const orderDetailRouter = require("./router/orderDetail")


mongoose.connect((process.env.MONGODB_URL),()=> {console.log("connected to mongodb") })


app.use(cors({credentials: true, origin: process.env.REACT_LOCALHOST})) 
// credentials cho phép gửi cookie vào fontend ,origi cho phep địa chỉ nào call api
app.use(cookieParser())
app.use (bodyParser.json()) 


app.use(morgan("common"))

app.use(express.static('images')); //anh cho fontend

//router
app.use("/v1/iphone",iphoneRouter)
app.use("/v1/auth",authRouter)
app.use("/v1/order",orderRouter)
app.use("/v1/orderDetail",orderDetailRouter)

server.listen(process.env.PORT,() =>{
    console.log("server is running...")
})
