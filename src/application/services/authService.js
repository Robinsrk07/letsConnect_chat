
const{AuthenticationError}= require("../errors/customError")
const IAuthService = require("../interfaces/IAuthService")
class AuthService extends IAuthService{
          constructor(authClient){
            super()
              this.authClient= authClient
                       }

                       async verifyToken(token){
                        if(!token){
                           throw new AuthenticationError("token not found application layer authservice ")
                        }
                          const response = await this.authClient.verifyToken(token)
                          return response
                       }
}

module.exports = AuthService