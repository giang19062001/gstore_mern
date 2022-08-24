// khi người dùng sau khi đăng nhập muốn làm một hành động gì đó thì phải xác thực token trước
const jwt = require("jsonwebtoken")

const middlewareController = {
    //xac thuc token
    verifyToken : (req,res,next) =>{
        const token = req.headers.authorization //lấy dữ liệu từ request trên header
        if(token){
            //Bearer wkmrwaoifbauejmasdfjl
            const accessToken = token.split(" ")[1]; //tách giá trị token sau Bearer
            jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{    //xác thực token
                if(err){
                   return res.status(403).json("token is not valid or expires")
                }
                req.user = user;
                next();
            })
        }else{

            res.status(401).json("you have not token")
        }
    },
    //phan quyen 
    verifyTokenActivity:(req,res,next) =>{
        middlewareController.verifyToken(req,res,() =>{
           if(req.user.id == req.params.id ){  
               next();
           } else{
              res.status(403).json("you are not allow")
           }
        })
    }
}
module.exports = middlewareController