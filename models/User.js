"use strict";
const MongoModels = require('mongo-models');
const Client = require('./Client');
const Joi = require('joi');

const userSchema = Joi.object({
    _id: Joi.object(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    designation: Joi.string(),
    roleId: Joi.object(),
})


class User extends MongoModels {

    static async getUserDetails(user){
        
    }

    static findByUserName({ username, password }) {
        return this.findOne({ username, password })
    }

    static async registerUser(userDetails) {
        const { client_id, client_secret, grant_type } = userDetails;
        const { username, password, name, email, designation, roleId } = userDetails;

        return await this.insertOne({ username, password, name, email, designation, roleId: new Object() })
        .then(async user=>{
            if(!user.length){
                throw new Error("Failed to save user");
            }else {
                return await Client.save({ client_id, client_secret, grant_type, userId : user[0]._id })
                .then(async client =>{
                    if(!client.length){
                        await this.deleteOne({ username, password, name, email, designation});
                        throw new Error("Failed to save user and client");
                    }else {
                        return {user, client};
                    }
                })
            }
        })
        // .catch(err=>{
        //     throw new Error(err)
        // })
/*
        // Step 1: Start a Client Session
        const session = await this.clients.default.startSession();

        // Step 2: Optional. Define options to use for the transaction
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        };

        // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
        // Note: The callback for withTransaction MUST be async and/or return a Promise.
        let newUser = ''
        try {
            newUser = await session.withTransaction(async () => {
                // Important:: You must pass the session to the operations
                let userId = '';
                await this.insertOne({ username, password, name, email, designation, roleId: {} }, { session }).then(
                    user =>{
                        userId = user._id;
                    }
                );
                await Client.insertOne({ client_id, client_secret, grant_type, userId }, { session });
            }, transactionOptions);
        } finally {
            await session.endSession();
            await this.disconnect();
        }
        return;
        return Promise.all([
            this.insertOne({ username, password, name, email, designation, roleId: {} }),
            Client.save()
        ])

        // return this.insertOne(user);  */
    }
  
}


User.collectionName = 'users';
User.schema = userSchema;

module.exports = User;