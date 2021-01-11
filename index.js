const express = require('express')
const app = express()
const https = require('https')
const fs = require('fs')
const port = 3000


app.use(express.static('_static'));

app.get('/test', (req, res) => {
    res.send("IT'S WORKING!")
})

console.log(`NODE_ENV=${process.env.NODE_ENV}`);

if(process.env.NODE_ENV == "prod"){
    app.listen(port, ()=>{
        console.log(`app is listening on port ${port}`);
    })
}

if(process.env.NODE_ENV === "dev"){
    console.log('here');
    const httpsOptions = {
        key: fs.readFileSync('./security/cert.key'),
        cert: fs.readFileSync('./security/cert.pem')
    }
    const server = https.createServer(httpsOptions, app)
        .listen(port, () => {
            console.log('server running at ' + port)
    });
}