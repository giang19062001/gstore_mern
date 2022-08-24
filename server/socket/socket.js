const socketAction = require('./action')

const socketJs = (socket,socketId) => {
     socket.on("User", (user) => {
       socketAction.addUser(user._id,socketId)
      }),
      socket.on("sendNotification", ({ sendUserId, orderId }) => { //gửi getNotification cho client
        const user = socketAction.getUser(sendUserId);
        socket.to(user?.socketId).emit("getNotification", {
          orderId
        });
      });
     socket.on("disconnect", () => {
        console.log("Client disconnected"); 
      })
}
module.exports  = socketJs