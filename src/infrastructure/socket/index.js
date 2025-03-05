
const socket = require("socket.io");
const crypto = require("crypto");


class SocketManager{
    constructor(server,checkConnection,chatCase){
      this.io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
        path:'/socket.io'
    })
    this.checkConnection = checkConnection;
    this.chatCase = chatCase
    this.setupSocketListeners();

};


static getSecretRoomId(userId,toUserId){
    return crypto.createHash("sha256")
    .update([userId, toUserId].sort().join("_"))
    .digest("hex"); 
}
   
setupSocketListeners(){
    console.log(this.io.on)

    this.io.on("connection",(socket)=>{
        console.log("Connected with", socket.id);
       

        socket.on("joinchat",async({userId,toUserId})=>{
            await this.handleJoinChat(socket, userId, toUserId);
        })

        socket.on("sendMessage",async({newMessage,toUserId,userId})=>{
           await this.handlesendMessage(newMessage,toUserId,userId)
        })

        socket.on("offer", ({ offer, toUserId, userId, isAudioOnly }) => {
            console.log("Offer received", isAudioOnly ? "(Audio Only)" : "(Video)");
            const roomId = SocketManager.getSecretRoomId(userId, toUserId);
            socket.to(roomId).emit("offer", {
                offer,
                fromUserId: userId,
                isAudioOnly
            });
        });

        socket.on("answer", ({ answer, toUserId, userId }) => {
            console.log("Answer received");
            socket.to(SocketManager.getSecretRoomId(userId, toUserId)).emit("answer", { answer });
        });

        socket.on("iceCandidate", ({ candidate, toUserId, userId }) => {
            socket.to(SocketManager.getSecretRoomId(userId, toUserId)).emit("iceCandidate", { candidate });
        });


        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });


    })


}



async handleJoinChat(socket,userId,toUserId){
     try{
     const isValidConnection = await this.checkConnection.execute(userId,toUserId)
     if(!isValidConnection){
        throw new Error("invaid connection socket")
     }
     const roomId = SocketManager.getSecretRoomId(userId,toUserId)
       socket.join(roomId)
     }
     catch(err){
        console.error("Join Chat Error:", err.message);
     }
}


async handlesendMessage(newMessage,toUserId,userId){
    
    let chat = await this.chatCase.execute(userId,toUserId,newMessage)
     const roomId = SocketManager.getSecretRoomId(userId,toUserId)
     this.io.to(roomId).emit("receiveMessage",{msg:newMessage})
     console.log(`Message sent to room ${roomId}`);
    }catch(err){
        console.log(err);

    }
}


module.exports= SocketManager