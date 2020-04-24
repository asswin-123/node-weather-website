const request = require('request')


const forecast =(latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8e6a971054ce8a5bbdce72e5d98aa9c0&query='+latitude+','+ longitude
   
    request({url,json:true},(error,{body}) => {
       if(error) {
          callback('unable to connect to service',undefined)
       } else if(body.error) {
          callback('unable to find forecast',undefined)
         }  else {
              callback(undefined,body = {
                 temperature: body.current.temperature,
                 feels_like: body.current.feelslike,
                 description:body.current.weather_descriptions[0]
              })
          
       }
    })
   }

   module.exports= forecast