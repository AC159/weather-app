const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=7c15491f009e2273b2a919baa9988707&query=${latitude},${longitude}`

    request({url: url, json: true}, function(error, { body }) {

    if (error){
        callback('Unable to connect to weather service!', undefined)
    }
    else if (body.error) {
        callback('Unable to find location...', undefined)
    }
    else {
        callback(undefined, {
            temperature: body.current.temperature,
            feels_like: body.current.feelslike,
            humidity: body.current.humidity
        })
    }

    })
}

module.exports = forecast