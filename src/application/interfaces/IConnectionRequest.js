class IConnectionRequest{
    find(){
        throw new Error("Method not implemented")

    }

     findOne(userId, requestId, status) {
        throw new Error("Method not implemented");
    }

     requestReceived(userId) {
        throw new Error("Method not implemented");
    }
    
    allconnections(){
        throw new Error("Method not implemented");

    }


    save(){
        throw new Error("Method not implemented")

    }


    getAllConnection(){
        throw new Error("methode not implimented")
    }

    updateConnection(){
        throw new Error("methode not implimented")

    }
}
module.exports = IConnectionRequest