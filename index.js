const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();
router.use(express.json())
router.use(express.urlencoded({ extended: true }))
router.use('/api', require('./src/routes/index')())

const app = express()
app.disable('x-powered-by')
app.use('/', router);


app.listen(8080, () => {
  console.log(`Listening on port 8080`)
  mongoose.connect('mongodb://127.0.0.1:27017/swiper-for-clothes').then(() => {
    console.log('Connected to MongoDB')
  })
})