const request = require('request');


const forecast = (latitude, logditude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=b1969edb3a33c78eefc75c77d97ac6d8&query='+latitude+','+logditude+'&unit=f';

    request({url, json: true}, (error, {body}=response) => { 
            if(error){
                callback('unable to connect the weather services', undefined);
            }else if(body.error){
                callback(body.error.info, undefined);
            }else{
                const current = body.current;
                callback(undefined,current.weather_descriptions[0] +'. It is currently ' + current.temperature + ' degress out . It feels like '+ current.feelslike + ' degress out.');
            }
    })
}

module.exports = forecast;