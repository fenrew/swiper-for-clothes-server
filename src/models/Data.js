const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataSchema = new Schema ({}, { strict: false })

module.exports = mongoose.model('Male-shoes-XXL', dataSchema)