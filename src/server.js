const Symbl =require('./ServerHelpers/Utils');
const express = require('express');
const mongoDbClient = require('./Database/DBConnect');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(cors());
app.post('/login', (req, res) => {
    console.log(JSON.stringify(req.body))
    res.send({
        token: 'test123'
    });
});
app.post('/send',(req,res)=>{

    console.log("get the send data"+JSON.stringify(req.body.url));
    console.log("get the send data"+JSON.stringify(req.body.token));
    let db= new mongoDbClient();
    db.insertUrlsInDB(req.body.url);
    let symbl = new Symbl();
    symbl.processUrls(req.body.url,req.body.token);
    res.send({
        urlSubmission:'success'
    });

});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));