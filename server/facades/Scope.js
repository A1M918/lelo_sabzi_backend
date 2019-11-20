const User = require('../../models/User');
const AccessToken = require('../../models/AccessToken');
const Client = require('../../models/Client');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const helperActions = require('../helpers/HelperActions');


class ScopeFacades {
    
    static async getUserScopesByToken(request){
     
        const token =  await helperActions.extractToken(request.access_token);

        const aggregate = [
            {
                $match:{
                    accessToken: {$eq: token}
                }
            }
            ,
            {
                "$lookup": {
                    "from": "scopes",
                    "foreignField": "clientId",
                    "localField": "client_id",
                    "as": "scopes"
                }
            }, {
                "$unwind": {
                    "path": "$scopes"
                }
            }
        ]
        return await AccessToken.aggregate(aggregate)
        
    }
}

module.exports = ScopeFacades;