const {User} = require("../modules/module")
const bcrypt = require("bcrypt") // giúp mã hóa mật khẩu của bạn
const jwt = require("jsonwebtoken")
 
let refreshTokens = []; // thay vì lưu refeshToken vào db thì lưu tạm vào 1 mảng để tránh trùng lặp khi tạo refreshtoken
const authController = {
    //register
    registerUser: async(req,res) =>{
       try {
           const salt = await bcrypt.genSalt(10) // kiểu mã hóa
           const hashed = await bcrypt.hash(req.body.password,salt) //mã hóa

           //create new user
           const newUser = await new User({
              username: req.body.username,
              fullname:req.body.fullname,
              phone: req.body.phone,
              address: req.body.address,
            password: hashed
           })
           //save db
           const user = await newUser.save();
           res.status(200).json(user);
       } catch (error) {
           res.status(500).json(error)
       }
    },
    //generate token
    genereateAccessToken :(user)=>{
        return jwt.sign({    //tao token
            id:user.id,             //token khi mã hóa ra sẽ bao gồm nội dung là id và role
            admin:user.admin
          },
          process.env.JWT_ACCESS_KEY,   // mã bí mật cần có
          {expiresIn: "10000s"} //THOI gian het han cua token
          )
    },
    genereateRefreshToken :(user)=>{
        return jwt.sign({    //tao refresh token để dự trữ phòng bị đánh cắp accessToken
            id:user.id,             
            admin:user.admin
          },
          process.env.JWT_REFRESH_KEY,  
          {expiresIn: "365d"} 
          )     
    },
    //login
    loginUser: async (req,res) =>{
        try {
            const user = await User.findOne({username: req.body.username}); // tìm theo username
            if(!user){
              return  res.status(404).json("wrong username")
            }
            const validPassword = await bcrypt.compare(   //mã hóa lại và so sánh password
                req.body.password,
                user.password  // nếu user trên tồn tại thì lấy password của user đó trong db
            )
            if(!validPassword){
              return   res.status(404).json("wrong password") // sử dụng return để hiện lỗi mà ko dừng hẳn chương trình
            }
            if(user && validPassword){
              const accessToken =  authController.genereateAccessToken(user)
              const refreshToken =  authController.genereateRefreshToken(user)
              refreshTokens.push(refreshToken) //lưu refreshToken vào mảng


              res.cookie("refreshToken",refreshToken ,{  //lưu cookie vào cookie
                  httpOnly:true,
                  path:"/",
                  secure:true,
                  sameSite:"strict" // chống bị hack
              }).send 
              // hàm send mới gửi cookie xuống client

             const {password,...remainUser} = user._doc; //mặc định đối tượng trong mongose là _doc{} 
              //destructering để ko respone ra password
             res.status(200).json({...remainUser,accessToken});  // responce user và token
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },
    // request refresh token : dùng khi access token hết hạn nó sẽ tìm refresh token để tạo lại accestoken mới
    requestRefreshToken: (req,res) =>{
        const refreshToken = req.cookies.refreshToken // set cookie tên gì thì lấy ra tên đó

        if(!refreshToken){
            return res.status(401).json("you have not refresh token");
        }
        else if(!refreshTokens.includes(refreshToken)){     //kiểm tra refreshToken có trong mảng ko (có nghĩa là có phải của bạn ko)
            return res.status(403).json("Refresh token do not of you");
        }else{
        jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user) =>{
            if(err){
                console.log(err)
            }
            // tạo token mới khi xác thực refreshToken đúng
            const newAccessToken = authController.genereateAccessToken(user)
            let newRefreshToken = authController.genereateRefreshToken(user)
            while(refreshTokens.includes(newRefreshToken)){
                newRefreshToken = authController.genereateRefreshToken(user)
            }
            refreshTokens.push(newRefreshToken) //lưu refreshToken vào mảng
            // refreshTokens =  refreshTokens.filter((token)=>token !== refreshToken)
             // phải loại refreshToken hiện tại ra khỏi mảng để tạo mới accesstoken,refreshtoken để tránh trùng lặp

            res.cookie("refreshToken",newRefreshToken ,{  //lưu cookie vào cookie
                httpOnly:true,
                path:"/",
                secure:false,
                sameSite:"none"  // chống bị hack
            })

            res.status(200).json({accessToken : newAccessToken})
        })}
     },
     userLogout: (req,res) =>{
    refreshTokens = [];
    //  refreshTokens =  refreshTokens.filter(token => token !== req.cookies.refreshToken) //loại bỏ các token đã tồn tại trong mảng
     res.clearCookie("refreshToken");  //xóa cookie
        res.status(200).json("log out succesfull")
        // vì access token  dc lưu trong redux store nên chỉ xóa đươc bên frontend
     },
//update user
    updateUser: async(req,res) =>{
        try {
           const user = await User.findById(req.params.id) 
           if(req.file === undefined){
            const objUser = req.body
               await user.updateOne({$set:objUser})

           }else{
           const objUser = {
               ...req.body,
                avatar:req.file.filename
           }
           await user.updateOne({$set:objUser})
           }

           const updateUser= await User.findById(req.params.id) 
  
           res.status(200).json(updateUser);
        } catch (error) {
         res.status(500).json(error)
  
        }
      },
       //get all user
    getAllUser : async(req,res) =>{ 
        try {
          const allUser = await User.find({$or:[{admin: false}]}) //or dung de xet dieu kien
          res.status(200).json(allUser)
        } catch (error) {
         res.status(500).json(error)
        } 
      },
       //get  user
    getUser : async(req,res) =>{ 
        try {
          const user = await User.findById(req.params.id)
          res.status(200).json(user)
        } catch (error) {
         res.status(500).json(error)
        } 
      },
}
module.exports = authController