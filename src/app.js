const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Leonardo Schimpf"
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address){
        return res.send({
            error: 'You need to provide an address.'
        });
    }

    geocode(address, (error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
    
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }

            res.send({ forecast, location, address})
        })
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Here we will provide you guidance on how to use the application.',
        name: 'Leonardo Schimpf'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Leonardo Schimpf'
    })
})

app.get('/help/*', (req, res) => {
    res.render('partials/not-found', {
        title: '404',
        error: 'Help article not found.',
        name: 'Leonardo Schimpf'
    })
})

app.get('*', (req, res) => {
    res.render('partials/not-found', {
        title: '404',
        error: 'Page not found.',
        name: 'Leonardo Schimpf'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})