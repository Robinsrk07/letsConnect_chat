const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const SocketService = require("./infrastructure/socket/test");
const{chatCase,checkConnection,newUserFormSignup,upadateUserdata,updateConnectionConsumer,IspremiumUpdate,newConnection,chatRoutes, authMiddleware}=require("../container")
// Initialize Express app
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Initialize SocketService
const socketService = new SocketService(server,checkConnection,chatCase)
newUserFormSignup.connect().then(()=>newUserFormSignup.listen())
upadateUserdata.connect().then(()=>upadateUserdata.listen())
updateConnectionConsumer.connect().then(()=>updateConnectionConsumer.listen())
IspremiumUpdate.connect().then(()=>IspremiumUpdate.listen())
newConnection.connect().then(()=>newConnection.listen())


app.use("/", async (req, res, next) => {
    try {
        await authMiddleware.verifyToken(req, res, next);
        
    } catch (err) {
        next(err);
    }
}, chatRoutes.getRouter());

// Error Handling Middleware
const { NotFoundError, ValidationError, AuthenticationError } = require("./presentation/errors/customError");
app.use((err, req, res, next) => {
    console.log(err);

    if (err instanceof NotFoundError) {
        return res.status(404).json({ message: err.message });
    }
    if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    if (err instanceof AuthenticationError) {
        return res.status(401).json({ message: err.message });
    }
    res.status(500).json({ message: 'Internal Server Error' });
});

// Database Connection
mongoose.connect("mongodb+srv://ROBINSRK:ROBINSRK123@letsconnect.z1hp8.mongodb.net/chat_service?retryWrites=true&w=majority&appName=LetsConnect")
    .then(() => {
        console.log('Database connected successfully');
        server.listen(5001, () => console.log('Server running on port 5000'));
    })
    .catch((err) => console.error('Database connection error:', err));