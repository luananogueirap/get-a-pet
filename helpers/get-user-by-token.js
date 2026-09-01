const jwt = require('jsonwebtoken')

const User = require('../models/User')

// user by token
const getUserByToken = async (token) => {
    if(!token){
        return res.status(401).json({message: 'access denied'})
    }

    const decoded = jwt.verify(token, 'nossosecret')

    const userId = decoded.indexOf
    
    const user = await User.findOne({_id: userId})
    return user
}

module.exports = getUserByToken