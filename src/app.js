const express = require('express');
const path = require('path')
const app = express();
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirectoryPath=path.join( __dirname,'../public');
//views New Path otherwise no need if you have a views folder
const viewsPath=path.join( __dirname,'../templates/views');
const partialsPath=path.join( __dirname,'../templates/partials/') 

//setup handlebars engine
app.set('view engine','hbs');
//views New Path otherwise no need if you have a views folder
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath));



app.get('',(req,res)=>{
    res.render('index',{
        name:'rakshit',
        title:'Weather'
    });
})
// app.get('',(req,res)=>{
    
//     res.send('<h1>Hello express!</h1>')
// })


app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Hello!! If you want my help, I will be there for you.',
        title: 'help page',
        name: 'rakshit'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name:'about',
        name: 'rakshit',
        title:'About me' 
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        if(data){
            forecast(data.latitude, data.longitude,  (error, data) => {
                if(error){
                    return res.send({
                        error
                    })
                }
                return res.send({
                    forecast:data,
                    address:req.query.address
                })
            })
    
        }
    })
    
})

app.get('/help/*',(req,res)=>{
    res.send('help article not found')
})

app.get('*',(req,res)=>{
    res.send('404 page')
})


app.listen(3000,()=>{
    console.log('Server is up on 3000!')
});