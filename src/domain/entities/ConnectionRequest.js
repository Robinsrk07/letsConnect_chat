class ConnectionRequest{
    constructor(data){
        this.senderId = data.senderId;
        this.receiverId = data.receiverId;
        this.status = data.status;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }

    isValid() {
        return (
            this.senderId &&
            this.receiverId &&
            this.isValidStatus(this.status) &&
            !this.isSelfConnection()
        );
    }

    isSelfConnection() {
        return this.senderId.toString() === this.receiverId.toString();
    }

    isValidStatus(status) {
        const validStatuses = ['accepted', 'ignored', 'interested', 'rejected'];
        return validStatuses.includes(status);
    }

    accept() {
        if (this.status !== 'interested') {
            throw new Error('Can only accept interested requests');
        }
        this.status = 'accepted';
        this.updatedAt = new Date();
    }

    reject() {
        this.status = 'rejected';
        this.updatedAt = new Date();
    }

    ignore() {
        this.status = 'ignored';
        this.updatedAt = new Date();
    }



}

module.exports = ConnectionRequest;