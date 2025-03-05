const socket = require("socket.io");
const crypto = require("crypto");

class SocketService {
  constructor(server, checkConnection, chatCase) {
    this.io = socket(server, {
      cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST"],
        credentials: true,
      },
      path: "/socket.io",
      transports: ["websocket", "polling"],
      pingTimeout: 500,
      pingInterval: 250,
    });

    this.checkConnection = checkConnection;
    this.chatCase = chatCase;
    this.initializeEvents();
  }

  static getSecretRoomId(userId,toUserId){
      return crypto.createHash("sha256")
      .update([userId, toUserId].sort().join("_"))
      .digest("hex"); 
  }

  initializeEvents() {
    this.io.on("connection", (socket) => {
      console.log("User connected:", socket.id);

        socket.on("joinRoom", ({ userId, toUserId }) => {
            const roomId = SocketService.getSecretRoomId(userId, toUserId);
            socket.join(roomId);
            console.log(`Socket ${socket.id} joined room ${roomId}`);
        });

      socket.on("sendMessage", async(data) => {
        console.log("Received sendMessage:", data);
        const {userId,toUserId,newMessage}= data
        let chat = await this.chatCase.execute(userId,toUserId,newMessage)
        const roomId = SocketService.getSecretRoomId(userId,toUserId)
        console.log(roomId)
        this.io.to(roomId).emit("receiveMessage",{msg:newMessage})
      });
      

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });

      
    });
  }
}

module.exports = SocketService;
