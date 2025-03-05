const { AuthenticationError } = require("../errors/customError");

class AuthMiddleware {
    constructor(authService) {
        this.authService = authService;
    }

    async verifyToken(req, res, next) {
        try {

            console.log("hited here")
            const { token } = req.cookies;
            if (!token) {
                throw new AuthenticationError("Token not present in the presentation layer");
            }

            const response = await this.authService.verifyToken(token);
            //console.log(response);

            req.user = response;

            next();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = AuthMiddleware;