let onlineUsers = [];//tạo mảng để giữ socketId của user

const socketAction = {
   
        addUser : (user, socketId) => {
            if(!onlineUsers.some((userOnl) => userOnl.user === user)) 
            {
                onlineUsers.push({ user, socketId }); 
            }
            else{
                    for( let i = 0; i < onlineUsers.length; i++){   
                        if ( onlineUsers[i].user === user) { 
                            onlineUsers.splice(i, 1); 
                            onlineUsers.push({ user, socketId }); 
                        }
                    }
            }
            console.log("onlineUsers",onlineUsers)

        },
        getUser : (user) => {
            return onlineUsers.find((userOnl) => userOnl.user === user); 
        }
}
module.exports = socketAction