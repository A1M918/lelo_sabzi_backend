const User = require('../../models/User');
const AccessToken = require('../../models/AccessToken');
const Client = require('../../models/Client');
const jwt = require('jsonwebtoken');
const secrete = require('../../config').secrete;
const HelperActions = require('../helpers/HelperActions');
const UserRole = require('../facades/UserRole');

class UserFacades {
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
                                res.status(501).json({
                                    error: "Client not found"
                                })
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
                        error: null,
                        message: "Registration Success!"
                    })
                } else {
                    // res.status(501).json({
                    //     error: "Register user failed"
                    // })
                    return new Error("Register user failed");
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

    static async getUserDetails(data) {
        // const scopes = await ScopesFacades.getUserScopesByToken(data.authorization);
        const token = await HelperActions.extractToken(data.authorization)
        let rolesData = await UserRole.getUserRoleByToken(token);
        rolesData = rolesData;
        // return rolesData;
        return {
            client_id: rolesData.client_id,
            userId: rolesData.userId,
            username: rolesData.username,
            name: rolesData.user.name,
            email: rolesData.user.email,
            designation: rolesData.user.designation,
            roleName: rolesData.roles == undefined ? "None" : rolesData.roles.name,
            privileges: rolesData.roles == undefined ? [] : rolesData.roles.privileges
        };
    }

    static async findSecretByUser(user, res) {


    }

}

module.exports = UserFacades;