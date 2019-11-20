


class HelperActions {

    static extractToken(query){
        if(query == undefined || query == '' || query == null) throw new Error(`User not logged in`)
        const token = query.split('Bearer ')[1]
        if(token.length)
            return token;
        else return ""
    }
}

module.exports = HelperActions;