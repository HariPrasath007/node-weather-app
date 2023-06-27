const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');


const staticpath = path.join(__dirname, '../public');
const viewpath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');


app.set('view engine','hbs');
app.set('views', viewpath);
hbs.registerPartials(partialspath);

app.use(express.static(staticpath));

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Index page',
        name: 'Hari'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'about page',
        name: 'Hari Prasath'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'help content',
        name: 'Prasath',
        help_cnt: 'Another way to spotlight help content is by sharing short, practical tips from your knowledge base that customers might not instinctively look ...'
    })
})


app.get('/help/*', (req, res) =>{
    res.render('error',{
        title: 'Error !',
       content: 'Help article not found!!',
       name: 'Hariprasath'
    })
   })

app.get('/weather', (req, res) =>{

    console.log(req.query)
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'Please provide the address'
        })
    }

    geocode(address, (error, {latitude, longditue, place} = {}) =>{
        if(error){
                return res.send({ error: error })
        }
            forecast(latitude ,longditue , (err, resp) => {
                if(err){
                    return res.send({error: err})
                }

                    console.log(place)
                    console.log('weather response',resp);
                     res.send({
                        forecast: resp,
                        place: place,
                        address: address,
                    });
                
            });
        
    })  

   
})

// app.get('/products', (req, res) =>{

//     if(!req.query.search){
//         return res.send({
//             error: 'Please provide the valid query string'
//         })
//     }

//     res.send({
//         products: []
//     })
// })


app.get('*', (req, res) =>{
 res.render('error',{
    title: '404',
    content: 'Page not found 404!!',
    name: 'Hariprasath'
 })
});



app.listen(3300, () =>{
    console.log('server is up on port 3000');
});