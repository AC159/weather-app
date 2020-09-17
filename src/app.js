const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

// Define path for 'templates' directory
app.set('view engine', 'hbs') // Set up handlebars
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anastassy',
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anastassy',
        helptext: 'This is some helpful text'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Anastassy',
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    // Geocoding
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { // Destructure the object, but if there is an error
        // it will try to destructure 'undefined' so pass a default parameter
        // which is an empty object.

        if (error) {
            return res.send({
                'Error: ': error
            })
        }

        // Forecast
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    'Error: ': error
                })
            }

            res.send({
                location: location,
                forecastData: forecastData,
                humidity: forecastData.humidity,
                address: req.query.address
            })
        })

    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Anastassy',
        errorMessage: 'Help article not found',
        title: '404',
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Anastassy',
        errorMessage: 'PAGE NOT FOUND',
        title: '404',
    })
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}...`)
})