const bodyParser = require('body-parser');
const express = require('express')
const https = require('https')
const app = express()
const fs = require('fs')
const port = 3000
const imageRouteHandler = require('./routes/image.js')
const pageRouteHandler = require('./routes/page.js')


// setup application middleware
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '5mb'}));
app.use(express.static('public'));


// routing
app.use('/image', imageRouteHandler)
app.use('/', pageRouteHandler)


// health probe
app.get('/health-check', function(req, res){ 
    res.send("OK");
})


// dev or prod mode
if(process.env.NODE_ENV === "dev"){
    console.log('running dev');
    const httpsOptions = {
        key: fs.readFileSync('./security/cert.key'),
        cert: fs.readFileSync('./security/cert.pem')
    }
    const server = https.createServer(httpsOptions, app)
        .listen(port, () => {
            console.log('server running in DEV mode on ' + port)
    });
} else {
    console.log('running prod');
    app.listen(port, ()=>{
        console.log('server running in PROD mode on ' + port)
    })
}