const Connection = require("../../../domain/entities/ConnectionRequest")
const IConnectionRequest = require("../../../application/interfaces/IConnectionRequest")
const ConnectionRequestModel = require("../../../infrastructure/dataBase/model/ConnectionRequestModel")
const mongoose = require('mongoose');


class ConnectionRepository extends IConnectionRequest{
    constructor(messageBroker) {
        super();
        this.messageBroker = messageBroker; // Inject message broker
    }


    async find(userId,toUserId){
        console.log(userId,toUserId)
     const connection = await ConnectionRequestModel.findOne({
        $or:[
            {senderId:userId,receiverId:toUserId,status: "accepted"},{senderId:toUserId,receiverId:userId,status: "accepted"}
           ]
     } )

     return connection?connection.toDomain():null
    }





   
 


    async save(userId, toUserId, status,requestId) {
            const connection = new ConnectionRequestModel({
                senderId: userId,
                receiverId: toUserId,
                status:status,
                requestId:requestId
            });
    
            await connection.save();
    
        }



        async updateConnection(requestId, status) {
            console.log("Updating requestId:", requestId, "with status:", status);
        
            // Check if the document exists
            const existingConnection = await ConnectionRequestModel.findOne({ requestId });
            if (!existingConnection) {
                console.error("No document found with requestId:", requestId);
                return null;
            }
        
            // Perform the update
            const updatedConnection = await ConnectionRequestModel.findOneAndUpdate(
                { requestId },
                { $set: { status } },
                { new: true }
            );
        
            if (!updatedConnection) {
                console.error("Update failed for requestId:", requestId);
                return null;
            }
        
            console.log("Updated Connection:", updatedConnection);
            return updatedConnection.toDomain();
        }
        



        
        


}



module.exports = ConnectionRepository