const bodyParser = require('body-parser');
const express = require('express')
const https = require('https')
const app = express()
const fs = require('fs')
const port = 3000
const imageRouteHandler = require('./routes/image.js')



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: '5mb'}));



app.use(express.static('_static'));

app.get('/test', (req, res) => {
    res.send("IT'S WORKING!")
})

app.use('/image', imageRouteHandler)

app.get('/*', function(req,res){
    var indexPath = __dirname + '/_static/index.html';
    console.log(indexPath);
    res.sendFile(indexPath);
});

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