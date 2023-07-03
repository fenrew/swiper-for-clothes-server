const express = require('express')
const { getUserAndNext } = require('./helpers')

module.exports = () => {
    const router = express.Router()

    router.use('/files', require('./files.js'))
    
    router.use(getUserAndNext)
    router.use('/data', require('./data.js'))
    router.use('/user', require('./user.js'))

    return router
}
