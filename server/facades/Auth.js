const User = require('../../models/User');
const AccessToken = require('../../models/AccessToken');
const Client = require('../../models/Client');
const jwt = require('jsonwebtoken');
const secrete = require('../../config').secrete;

class AuthFacades {
    static async login(user, res) {
        console.log("User", user);
        return await User.findByUserName(user)
            .then(async data => {
                const user = data
                console.log("then User", data)
                if (user) {
                    await Client.findByUserId(user)
                        .then(async clients => {
                            const client = clients[0]
                            console.log("Client : ", client);
                            if (client !== null && client) {
                                // let signedJWT = await jwt.verify({user: user.password, client_secret: client.secrete}, client.secrete);
                                res.json({
                                    access_token: client.token.accessToken
                                });
                            } else {
                                // res.status(501).json({
                                //     error: "Client not found"
                                // })
                                throw new Error("Client not found")
                            }
                        })
                } else {
                    throw new Error("User not found");
                }
            });
    }

    static async register(user, res) {
        return await User.registerUser(user)
            .then(async data => {
                if (data) {
                    //res.json(data)
                    const token = await AuthFacades.saveJWTToken(data)
                    await res.json({
                        status: "SUCCESS",
                        message: "User Register Successfully"
                    })
                } else {
                    res.status(501).json({
                        error: "Register user failed"
                    })
                }
            });
    }

    static async getJWTToken(data) {
        console.log("getJWT", data)
        const user = data.user[0];
        const client = data.client[0];
        let signedJWT = await jwt.sign({ user: user.password, client_secret: client_secret }, client.client_secrete);
        return signedJWT;
    }
    static async saveJWTToken(data) {
        const user = data.user[0];
        const client = data.client[0];
        let signedJWT = await jwt.sign({ user: user.password, client_secret: client.client_secret }, client.client_secret);
        const token = {
            client_id: client._id,
            userId: user._id,
            exp: 123123,
            accessToken: signedJWT
        }

        return await AccessToken.save(token)
            .then(token => {
                return {
                    access_token: signedJWT
                }
            })
    }

    static async findSecretByToken(token, res) {
        const aggregate = [
            {
                $match: {
                    accessToken: { $eq: token }
                }
            }
            ,
            {
                $lookup: {
                    from: 'clients',
                    foreignField: '_id',
                    localField: 'client_id',
                    as: 'secrete'
                }
            }, {
                $unwind: {
                    path: '$secrete'
                }
            }
        ]

        return await AccessToken.aggregate(aggregate);

        // return new Error("Working");
    }


    static async getRole(req, res) {
        const user = models.Users;
        const query = req.email;
        let match = {
            $match: {
                $and: [
                    { email: { $eq: query } }
                ]
            }
        }

        let aggregate = [
            match,
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'userRole'
                }
            },
            // {
            //     $lookup: {
            //             from: 'tokens',
            //             localField: '_id',
            //             foreignField: 'userId',
            //             as: 'userClient'
            //         }
            // },
            {
                $lookup: {
                    from: 'userClients',
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'userClient'
                }
            },
            {
                $unwind: {
                    path: "$userClient",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'tclients',
                    localField: 'userClient.clientId',
                    foreignField: 'clientId',
                    as: 'tClient'
                }
            },
            {
                $unwind: {
                    path: "$tClient",
                    preserveNullAndEmptyArrays: true
                }
            }

        ]

        let queryResult;

        await user.aggregate(aggregate).then(data => {
            queryResult = data[0];
        });
        console.log("getClient Details: ", queryResult);
        const detail = await tokenHelper.getClientDetails(queryResult);
        await res.json(detail)
    }

}

module.exports = AuthFacades;