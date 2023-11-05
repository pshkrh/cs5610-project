const mongoose = require('mongoose')

const createCityNameSchema = new mongoose.Schema({
    cityName:[String]
})

module.exports = mongoose.model('CityName',createCityNameSchema)