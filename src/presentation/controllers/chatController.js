const { NotFoundError, ValidationError } = require("../errors/customError");

class ChatController {
    constructor(fetchChatCase, fetchUser) {
        this.fetchChatCase = fetchChatCase;
        this.fetchUser = fetchUser;
    }

    async fetchChat(req, res, next) {
        try {
            const { userId } = req.user;
            const { toUserId } = req.body;

            if (!userId || !toUserId) {
                throw new ValidationError("User ID and To User ID are required");
            }

            //console.log("debug from", userId, toUserId);
            const chat = await this.fetchChatCase.execute(userId, toUserId);

            if (!chat) {
                throw new NotFoundError("Chat not found");
            }
          //console.log("debug",chat)
            return res.send(chat); // Return the response and exit
        } catch (err) {
            return next(err); // Return here to prevent further execution
        }
    }

    async endUser(req, res, next) {
        try {
            const { toUserId } = req.query;

            if (!toUserId) {
                throw new ValidationError("To User ID is required");
            }

            const toUser = await this.fetchUser.execute(toUserId);

            if (!toUser) {
                throw new NotFoundError("End user not found");
            }

            return res.send(toUser); // Return the response and exit
        } catch (err) {
            return next(err); // Return here to prevent further execution
        }
    }
}

module.exports = ChatController;