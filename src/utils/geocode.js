const request = require('request');

const geocode = (address, callback) =>{
    console.log('address', address);
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiaGFyaTk2MjkwIiwiYSI6ImNsaXlpNXF1MTBjZTMzdnFxMWtndW94aHkifQ.YCNuQzjSv7l3yT0OUYe4qA&limit=1';

    request({url, json:true}, (error, { body } =response) => {
        if(error){
            callback('unable to connect to geo Loacation services', undefined)
        }else if(body.features.length ==0){
            callback('unable to find the location', undefined)
        }else{
            const latandlog = body.features[0].center;
            const place = body.features[0].place_name;
            callback(undefined, {
                latitude:latandlog[1],
                longditue: latandlog[0],
                place: place
            })
        }
    })
}

module.exports = geocode;