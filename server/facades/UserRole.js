const TokenModel = require('../../models/AccessToken');


class UserRole {

    static async getUserRoleByToken(token) {
        const aggregate = [
            {
                $match: {
                    accessToken: { $eq: token }
                }
            }
            ,
            {
                $lookup: {
                    from: 'users',
                    foreignField: '_id',
                    localField: 'userId',
                    as: 'user'
                }
            }
            ,
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            }
            ,
            {

                $lookup: {
                    from: 'roles',
                    foreignField: '_id',
                    localField: 'user.roleId',
                    as: 'roles'
                }

            }
            ,
            {
                $unwind: {
                    path: "$roles",
                    preserveNullAndEmptyArrays: true
                }
            }
        ];
        const result = await TokenModel.aggregate(aggregate);
        return result[0];
    }
}


module.exports = UserRole;