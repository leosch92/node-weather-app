const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=132694046555d46696a6178f3959a401&query=${latitude},${longitude}`

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined)
        } else if (response.body.error) {
            callback('Unable to find forecast for given latitude and longitude. Please provide different data.', undefined)
        } else {
            const current = response.body.current;
            callback(undefined, `It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast