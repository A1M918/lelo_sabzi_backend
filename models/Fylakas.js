"use strict";
const MongoModels = require('mongo-models');
const Joi = require('joi');

const schema = Joi.object({
    _id: Joi.object(),
    userName: Joi.string().required(),
    action: Joi.string().required(),
    time_initiated: Joi.date().timestamp('javascript').required().default(new Date()),
    last_edited: Joi.date().timestamp('javascript').allow(null),
    deleted: Joi.bool().required().default(false)
})


class Fylakas extends MongoModels {

}


Fylakas.collectionName = 'time_sheet';
Fylakas.schema = schema;

module.exports = Fylakas;