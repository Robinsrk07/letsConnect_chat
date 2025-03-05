const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const IAuthClient = require("../../application/interfaces/IAuthClient")
const PROTO_PATH = path.resolve(__dirname, '../../../protos/auth.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const authProto = grpc.loadPackageDefinition(packageDefinition).auth;

class AuthClient extends  IAuthClient {
    constructor() {
        super()
        this.client = new authProto.AuthService(
            'localhost:50051', 
            grpc.credentials.createInsecure()
        );
    }

    verifyToken(token) {
        
        return new Promise((resolve, reject) => {
            this.client.AuthenticateUser({ token }, (error, response) => {
                if (error) {
                    console.error("gRPC error:", error); // Log the gRPC error

                    return reject(error);
                }
                resolve(response);
            });
        });
    }
}

module.exports = AuthClient;
