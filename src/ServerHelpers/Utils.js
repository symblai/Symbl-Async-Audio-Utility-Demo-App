const fetch = require('node-fetch');
const mongoDbClient = require('./Database/DBConnect');

class Symbl {
    constructor() {
        this.id = 'id_1';
    }
    processUrls(val,token) {

        console.log("inside symbl parsing"+val);
        console.log("inside symbl parsing"+token);
        this.postAudio(val,token);
    }
    postAudio(url,token){
        let myHeaders = new fetch.Headers();
        myHeaders.append("x-api-key",token.slice(1,-1));
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({"url":url.toString(),"confidenceThreshold":0.6,"timezoneOffset":0});

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://api.symbl.ai/v1/process/audio/url", requestOptions)
            .then(response =>
                response.text()
            )
            .then((result) => {
                console.log("result of fetch"+result);
                let db= new mongoDbClient();
                db.connect().then(()=>{

                });
            })
            .catch((error) => {
                console.log('error', error)
            });

    }

}
module.exports=Symbl;



