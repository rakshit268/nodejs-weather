const request = require('request');

//GeoCoding
const geocode= (address,callback) => {
    console.log(address);
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicmFrczEyMyIsImEiOiJja3pjOHlzaWcwdDZzMndzNm9qdjlwNzFmIn0.UdNGJXph7J18kPJHwJK9qw'
    request({ url: url,json:true }, (error, response) => {
        if(error){
            callback('unable to connect',undefined);
        }
        else if(response.body.features.length === 0){
            callback('unable to find location',undefined)
        }
        else{
            console.log('hg');
            callback(undefined,{
                longitude:response.body.features[0].center[0],
                latitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            
            })            
        }  
    })
}

module.exports = geocode;