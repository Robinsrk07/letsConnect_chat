const express = require("express");



class ChatRoute {
    constructor(chatController) {
        this.router = express.Router();
        this.chatController = chatController;
        this.setupRoutes();
    }

    setupRoutes() {
        this.router.post("/chat/chats",(req,res,next)=> this.chatController.fetchChat(req,res,next));
        this.router.get("/chat/endUser",(req,res,next)=> this.chatController.endUser(req,res,next));
    }

    getRouter() {
        return this.router;
    }
}

module.exports = ChatRoute;
