const request = require('request');

//forecast
const forecast= (latitude,longitude,callback) => {
console.log(latitude,longitude);
const url='http://api.weatherstack.com/current?access_key=0ad1c284f8da9b68a2da08def2f0e5cb&query='+latitude+','+longitude

//2 arguements       url,functiom

request({ url: url,json:true }, (error, response) => {
    if(error){
    callback('unable to connect',undefined);
     
    }
    else if(response.body.error){
    callback('unable to find location',undefined)
    }
    else{
        data=`It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out at ${response.body.location.country},${response.body.location.name},${response.body.location.region}`
        callback(undefined,data )
    }
    
})

};


module.exports = forecast;