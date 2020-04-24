const request = require('request')

const geocode =(location,callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(location) + '.json?access_token=pk.eyJ1IjoiYXNzd2luIiwiYSI6ImNrOWJlbzNibDBvOGozb3MyYXd6NGFycHkifQ.pPZkpySn4sgXyFbcEVfZ9g&limit=1'
    
    request({url,json:true}, (error,{body}={}) => {
      console.log(body.features.length)
        if(error) {
           callback('unable to connect to the service',undefined)
        } else if(body.features.length === 0) {
           callback('unable to find location',undefined)
        }
        else {
           
           callback(undefined,{
              latitude: body.features[0].center[1],
              longitude: body.features[0].center[0],
              location : body.features[0].place_name
           })
        }
    })
 }

 module.exports = geocode