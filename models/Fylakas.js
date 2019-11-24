"use strict";
const MongoModels = require('mongo-models');
const Joi = require('joi');

const schema = Joi.object({
    _id: Joi.object(),
    user_actual_name: Joi.string(),
    user_name: Joi.string().required(),
    user_id: Joi.string().required(),
    channel_id: Joi.string().required(),
    channel_name: Joi.string().required(),
    action: Joi.string().required(),
    log_time: Joi.date().required(),
    last_edited: Joi.date().required().allow(null).allow(''),
    deleted: Joi.bool().required().default(false)
})

class Fylakas extends MongoModels {
    static async findByUserId(userId) {
        return await this.findOne({ user_id: userId })
    }

    static async findInToday(user_id) {

        let dt = new Date()
        let dl = new Date()
        dt = dt.setHours(0, 0, 0, 0)
        dl = dl.setHours(23, 59, 59)

        const query = {
            "log_time": {
                "$gte": (new Date(dt)).getTime(),//ISODate(dt), use ISODate in case running query in MongoDB
                "$lt": (new Date(dl)).getTime(),//ISODate(dl)
            },
            "user_id": {
                $eq: user_id
            }
        }
        console.log("findInToday ======== ", JSON.stringify(query))
        return await this.findOne(query);
    }

    static async findOutToday(user_id) {

        let dt = new Date()
        let dl = new Date()
        dt = dt.setHours(0, 0, 0, 0)
        dl = dl.setHours(23, 59, 59)
        let regexp = new RegExp('\/in.');
        console.log("REGEX", regexp)
        const query = {
            "log_time": {
                "$gte": (new Date(dt)).getTime(),//ISODate(dt), use ISODate in case running query in MongoDB
                "$lt": (new Date(dl)).getTime(),//ISODate(dl)
            },
            "user_id": {
                $eq: user_id
            },
            // "command": { $regex: regexp }
            "command": { $eq: '\/in' }
            //{
            //    $in: { $regex: /\/in./ }
            //}
        }
        console.log("findOutToday ======== ", JSON.stringify(query))
        return await this.findOne(query);
    }

    static async findAndUpdate(query = "", data) {
        // let updateQuery = [];
        // let updateData = [];
        // await (Object.keys(query))
        //     .forEach((key, i) => {
        //         const queryObj = {}
        //         queryObj[key] = query[key]
        //         updateQuery.push(queryObj)
        //     })

        // await (Object.keys(data))
        //     .forEach((key, i) => {
        //         const dataObj = {}
        //         dataObj[key] = data[key]
        //         updateData.push(dataObj)
        //     })

        // console.log("QueryData", updateQuery)
        // console.log("Data", query)
        return await this.updateOne({ _id: query._id }, { $set: data }, { upsert: true, returnNewDocument: true })
    }
}


Fylakas.collectionName = 'time_sheet';
Fylakas.schema = schema;

module.exports = Fylakas;