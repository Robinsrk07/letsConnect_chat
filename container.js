
const UserCreatedCase = require("./src/application/use_cases/createUser")
const GenericConsumer = require('./src/infrastructure/RabitMq/consumer');
const UserRepository = require("./src/infrastructure/dataBase/repositories/UserRepositoires")
const UpdateUser = require("./src/application/use_cases/updateUser")
const ConnectionSaveCase = require("./src/application/use_cases/connectionSaveCase")
const ConnectionRepository = require("./src/infrastructure/dataBase/repositories/connectionRepositry")
const ChatRepository =  require("./src/infrastructure/dataBase/repositories/chatRepository")
const ChatCase = require("./src/application/use_cases/chatCase")
const CheckConnection = require("./src/application/use_cases/checkConnection")
const AuthClient = require("./src/infrastructure/grpc/Authclient")
const AuthService = require("./src/application/services/authService")
const AuthMiddleware = require("./src/presentation/middlewares/verifyToken")
const ChatRoutes = require("./src/presentation/routes/ChatRoutes")
const ChatController = require("./src/presentation/controllers/chatController")
const UpdateConnection = require("./src/application/use_cases/updateConnection")
const UserPaymentUpdate = require("./src/application/use_cases/userUpdate_Payment")
const FetchChat = require("./src/application/use_cases/fetchChatCase")
const FetchUser = require("./src/application/use_cases/fetchUser")


const authClient = new AuthClient()
const authService = new AuthService(authClient)
const authMiddleware = new AuthMiddleware(authService)
const userRepository = new UserRepository()
const connectionRepository = new ConnectionRepository()
const chatRepository = new ChatRepository()
const chatCase = new ChatCase(connectionRepository,chatRepository)
const checkConnection = new CheckConnection(connectionRepository)
const connectionSaveCase=new ConnectionSaveCase(connectionRepository) 
const userCreatedCase = new UserCreatedCase(userRepository)
const updateUserCase = new UpdateUser(userRepository)
const updateConnection  = new UpdateConnection(connectionRepository)
const userPaymentUpdate = new UserPaymentUpdate(userRepository)
const fetchChatCase = new FetchChat(connectionRepository,chatRepository)
const fetchUser = new FetchUser(userRepository)
const chatController = new ChatController(fetchChatCase,fetchUser)
const chatRoutes = new ChatRoutes(chatController)


const newUserFormSignup = new GenericConsumer("user_created","chat_usercreate",userCreatedCase)
const newConnection = new GenericConsumer("sendConnection","chat_connections",connectionSaveCase)
const upadateUserdata = new GenericConsumer("user_updated","chat_userUpdate",updateUserCase)
const updateConnectionConsumer = new GenericConsumer("ConnectionUpdate","chat_connectionUpdate",updateConnection)
const IspremiumUpdate = new GenericConsumer("IsPremiumUpdate","IspremiumUpdateChat",userPaymentUpdate)


module.exports = {
    newUserFormSignup,
    upadateUserdata,
    newConnection,
    
    checkConnection,
    chatCase,authMiddleware,chatRoutes,updateConnectionConsumer,IspremiumUpdate
}