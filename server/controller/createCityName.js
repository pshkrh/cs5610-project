const CityName = require('../models/cityName')

exports.createcityname = async (req,res) =>{
    const cityName = new CityName({
        cityName:["San Jose", "Santa Clara", "Campbell", "Milpitas", "Cupertino", "Los Gatos", "Mountain View", "Los Altos", "Stanford", "Fremont", "Newark", "Sunnyvale", "Palo Alto", "East Foothills"]
    })
    cityName.save()
    return res.status(200).json("city name created successfully")
}