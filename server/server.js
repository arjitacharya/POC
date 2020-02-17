
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const mime = require('mime');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

// app.post('/upload/image', (req, res) => {
//     var matches = req.body;
//     res.send({ data: 'ok' })
// })

const uploadImage = (req, res, next) => {

    console.log("----serving POST-- -")
    var matches = req.body.base64image && req.body.base64image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    response = {};

    if (matches && matches.length !== 3) {
        return new Error('Invalid input string');
    }

    if (matches && matches.length) {
        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');
    }
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = new Date().getTime()
    try {
        fs.writeFileSync(fileName.toString()+'.png', imageBuffer, 'utf8');
        return res.send({ "status": "success" });
    } catch (e) {
        next(e);
    }
}

app.post('/upload/image', uploadImage)

app.listen(9191, () => console.log(`Server is listening on port ${9191}`))
