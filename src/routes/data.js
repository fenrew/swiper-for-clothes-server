const express = require('express')
const router = module.exports = express.Router()
const Data = require('../models/Data')

// Serve the data from the algorithm 

router.get('/', (req, res) => {
    const seenItemIds = req.user.seenItems.map(item => item._id)
    Data.find({ _id: { $nin: seenItemIds } }).limit(7).then(data => {
        res.send(data)
    }).catch(err => {
        console.error(err)
        res.status(500).send('Something went wrong with fetching data')
    })
})

router.post('/seen/:id', (req, res) => {
    req.user.updateSeenItem(req.params.id).then(result => {
        res.send(result)
    }).catch(err => {
        console.error(err)
        res.status(500).send(err.message)
    })
})

router.post('/favourite/:id', (req, res) => {
    req.user.updateFavouriteItem(req.params.id).then(result => {
        res.send(result)
    }).catch(err => {
        console.error(err)
        res.status(500).send(err.message)
    })
})

router.post('/like/:id', (req, res) => {
    req.user.updateLikedItem(req.params.id).then(result => {
        res.send(result)
    }).catch(err => {
        console.error(err)
        res.status(500).send(err.message)
    })
})

router.post('/dislike/:id', (req, res) => {
    req.user.updateDislikedItem(req.params.id).then(result => {
        res.send(result)
    }).catch(err => {
        console.error(err)
        res.status(500).send(err.message)
    })
})