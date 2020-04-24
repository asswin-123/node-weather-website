const express = require('express')
const hbs =require('hbs')
const path= require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app =express()
// define paths for express config
const pathDirectory = path.join('__dirname','../public')
const viewPath = path.join('__dirname','../templates/views')
const viewPartialsPath = path.join('__dirname','../templates/partials')

//setup static directory to serve
app.use(express.static(pathDirectory))

//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(viewPartialsPath)

app.get('/',(req,res) => {
    res.render('index',{
        title:'weather',
        name:'asswin'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{     
        title:'Help',
        desc:'ask anything',
        name: 'asswin'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About',
        name:'Asswin'
    })
})

app.get('/weather',(req,res) => {
    if( !req.query.address) {
        return res.send({
            error: 'you must enter address'
        })
    }
        geocode(req.query.address,(error,{latitude:lat,longitude,location} ={}) => {
            if(error) {
                return res.send({error})      
            }
         
            forecast(lat, longitude,(error,{description,temperature,feels_like}={}) => {
               if(error) {
                  return res.send({error})
               }
              
               res.send({
                   location,
                   description,
                   temperature,
                   feels_like
               })
            })
         })
   

    
})

app.get('*',() => {
    res.render('error404',{
        title:'Weather',
        errormsg:'The following page is not found',
        name:'Asswin'
    })
})
app.listen(3000,() => {
    console.log("the server is started")
})