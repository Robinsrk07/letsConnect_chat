
const socket = require("socket.io");
const crypto = require("crypto");
//const { checkConnection } = require("./ConnectionValidation");
const Chat = require("../dataBase/model/chat");

const getSecretRoomId = (userId, toUserId) => {
    return crypto.createHash("sha256")
        .update([userId, toUserId]
            .sort().join("_"))
        .digest("hex");
};

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true,
        },
        path:'/socket.io'
    });

    io.on("connection", (socket) => {
        console.log("connected with", socket.id);

        socket.on("joinchat", async ({ userId, toUserId }) => {
            try {
                // const ConnectionValidation = await checkConnection(userId, toUserId);
                // if (!ConnectionValidation) {
                //     throw new Error("Connection validation failed");
                // }
                const roomId = getSecretRoomId(userId, toUserId);
                socket.join(roomId);
            } catch (err) {
                console.log(err);
            } 
        });

        socket.on("sendMessage", async ({ newMessage, toUserId, userId }) => {
            try {
                const ConnectionValidation = await checkConnection(userId, toUserId);
                if (!ConnectionValidation) {
                    return;
                }
                const roomId = getSecretRoomId(userId, toUserId);
                let chat = await Chat.findOne({
                    participent: { $all: [userId, toUserId] },
                });

                if (!chat) {
                    chat = new Chat({
                        participent: [userId, toUserId],
                        messages: []
                    });
                }

                let msg = {
                    senderId: userId,
                    text: newMessage.text,
                    timeStamp: newMessage.timestamp
                };

                chat.messages.push(msg);
                await chat.save();
                io.to(roomId).emit("receiveMessage", { msg });
            } catch (err) {
                console.log(err);
            }
        });

        socket.on("offer", ({ offer, toUserId, userId, isAudioOnly }) => {
            console.log("Offer received", isAudioOnly ? "(Audio Only)" : "(Video)");
            const roomId = getSecretRoomId(userId, toUserId);
            socket.to(roomId).emit("offer", {
                offer,
                fromUserId: userId,
                isAudioOnly
            });
        });

        socket.on("answer", ({ answer, toUserId, userId }) => {
            console.log("Answer received");
            socket.to(getSecretRoomId(userId, toUserId)).emit("answer", { answer });
        });

        socket.on("iceCandidate", ({ candidate, toUserId, userId }) => {
            socket.to(getSecretRoomId(userId, toUserId)).emit("iceCandidate", { candidate });
        });

        socket.on("disconnect", () => {
            console.log("Client disconnected:", socket.id);
        });
    });
};

module.exports = initializeSocket;