"use strict";
const MongoModels = require('mongo-models');
const Joi = require('joi');

const privileges = Joi.object({
    EntityName: Joi.string().required(),
    isRead: Joi.string().required(),
    operations: Joi.array().string()
})

const schema = Joi.object({
    _id: Joi.object().required(),
    name: Joi.string().required(),
    privileges: Joi.array().ordered(privileges)
})


class Role extends MongoModels {
    static static getRolesByUser(user){
        
    }
}


AccessToken.collectionName = 'roles';
AccessToken.schema = schema;

module.exports = Role;