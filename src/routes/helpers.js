const User = require('../models/User')
const { v4: uuidv4 } = require('uuid');

const getUser = async (req, res) => {
    if(req.user){
        return req.user
    }

    const findUser = () => {
        if(req.loggedInUser){
            // Handle logged in users here
            return {} // Return user
        } else {
            const token = req.query.token
            if(token){
                return User.findOne({
                    tempToken: token
                })
            }
        }
        return
    }
    
    return findUser().then(user => {
        if(!user){
            const token = generateToken()
            // TODO: Make sure the token is unique
            const newUser = new User({
                tempToken: token
            })
            return newUser.save()
        } else {
            return user
        }
    }).then(user  => {
        req.user = user
        return user
    }).catch(err => {
        console.err(err)
        res.sendStatus(err.status)
    })
}

const getUserAndNext = (req, res, next) => {
    return getUser(req, res).then(() => {
        next()
    })
}

const generateToken = () => {
    let str = ''
    for(let i = 0; i < 10; i++){
        str += uuidv4()
    }
    return str
}

module.exports = { getUser, getUserAndNext }