"use strict";
const MongoModels = require('mongo-models');
const Joi = require('joi');

const schema = Joi.object({
    _id: Joi.object(),
    client_id: Joi.string().required(),
    client_secret: Joi.string().required(),
    userId: Joi.object().required(),
    grant_type: Joi.string().required(),
})


class Client extends MongoModels {
    static findByClient({ client_id }) {
        return this.findOne({ client_id })
    }

    static async findByUserId(user) {
        console.log("USER in Client", { _id: user._id.toString() })
        const aggregate = [
            {
                $match: {
                    $and :[
                        {userId: { $eq : user._id } }
                    ]
                }
            }
            ,
            {
                $lookup:{
                    from: 'accessToken',
                    foreignField: 'client_id',
                    localField: '_id',
                    as: 'token'
                }
            }
            ,
            {
                $unwind: {
                    path: '$token',
                    preserveNullAndEmptyArrays: true
                  }
            }
        ]
        return this.aggregate(aggregate);
    }

    static async save(client) {
        return this.insertOne(client);
    }
}


Client.collectionName = 'clients';
Client.schema = schema;

module.exports = Client;