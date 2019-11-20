"use strict";
const MongoModels = require('mongo-models');
const Joi = require('joi');

const schema = Joi.object({
    _id: Joi.object(),
    client_id: Joi.object().required(),
    userId: Joi.object().required(),
    exp: Joi.number().required().default(0),
    accessToken: Joi.string().required()
})


class AccessToken extends MongoModels {
    static findByClient({client_id}) {
        return this.findOne({client_id})
    }

    static async save(access_token){        
      return this.insertOne(access_token);
    }
}


AccessToken.collectionName = 'accessToken';
AccessToken.schema = schema;

module.exports = AccessToken;