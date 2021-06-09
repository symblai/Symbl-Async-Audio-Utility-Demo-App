const fetch = require('node-fetch');
let stack =[];
class ProcessData {
    conversationArray=[];
    maxRequest=0;
    constructor() {
        this.id = 'id_1';
    }
    makeUrlList(urls){
        if(urls==undefined||urls==null)
        {
            console.log("Please submit valid url");
        }
        else {
            stack = urls.split(",");
            return stack;
        }
    }
    async processUrls(val,token) {


        let urlStack=this.makeUrlList(val);
        for (let i = 0; i < urlStack.length; i++) {
                this.postAudio((urlStack[i]).split(" ").join(""), token).then(val => {
                    this.conversationArray[i] = val;
                    console.log(this.conversationArray);
                });
            }
            return this.conversationArray.toString();;


        //return this.conversationArray.toString();
    }

    async postAudio(url,token){
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
        let res;
         await fetch("https://api.symbl.ai/v1/process/audio/url?enableSpeakerDiarization=true&diarizationSpeakerCount=2", requestOptions)
            .then(response =>
                response.text()
            )
            .then((result) => {
                res=result;

            })
            .catch((error) => {
                console.log('error', error);
                res =error;

            });
        return res;
    }
    async getStatus(jobId,token){
        if(jobId!=undefined) {
            let myHeaders = new fetch.Headers();
            myHeaders.append("x-api-key", token.slice(1, -1))
            myHeaders.append("Content-Type", "application/json");


            let res;
            let requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            await fetch("https://api.symbl.ai/v1/job/" + jobId, requestOptions)
                .then(response => response.text())
                .then(result => {

                    res = result;
                })
                .catch(error => console.log('error', error));

            return res;
        }
        else {
            return "invalid job Id";
        }

    }
    async getTopics(conversationId,token){

        let res;
        let myHeaders = new fetch.Headers();
        myHeaders.append("x-api-key", token.slice(1,-1))
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch("https://api.symbl.ai/v1/conversations/"+conversationId+"/topics?sentiment=true&parentRefs=true", requestOptions)
            .then(response => response.text())
            .then(result => {

                res=result;
            })
            .catch(error => console.log('error', error));

        return res;
    }
    async getQuestions(conversationId,token){
        console.log("getting questions for"+conversationId);
        let res;
        let myHeaders = new fetch.Headers();
        myHeaders.append("x-api-key", token.slice(1,-1))
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch("https://api.symbl.ai/v1/conversations/"+conversationId+"/questions", requestOptions)
            .then(response => response.text())
            .then(result => {

                res=result;
            })
            .catch(error => console.log('error', error));

        return res;
    }
    async getActionItems(conversationId,token){

        let res;
        let myHeaders = new fetch.Headers();
        myHeaders.append("x-api-key", token.slice(1,-1))
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch("https://api.symbl.ai/v1/conversations/"+conversationId+"/action-items", requestOptions)
            .then(response => response.text())
            .then(result => {

                res=result;
            })
            .catch(error => console.log('error', error));

        return res;
    }
    async getTranscript(conversationId,token){

        let res;
        let myHeaders = new fetch.Headers();
        myHeaders.append("x-api-key", token.slice(1,-1))
        myHeaders.append("Content-Type", "application/json");


        let raw = "{\r\n  \"contentType\": \"text/markdown\",\r\n  \"createParagraphs\": true,\r\n  \"phrases\": {\r\n    \"highlightOnlyInsightKeyPhrases\": true,\r\n    \"highlightAllKeyPhrases\": true\r\n  },\r\n  \"showSpeakerSeparation\": true\r\n}";
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body:raw,
            redirect: 'follow'
        };
        await fetch("https://api.symbl.ai/v1/conversations/"+conversationId+"/transcript", requestOptions)
            .then(response => response.text())
            .then(result => {

                res=result;
            })
            .catch(error => console.log('error', error));

        return res;
    }
    async getAllData(conversationId,token){
        let questions= await this.getQuestions(conversationId,token);
        let topics= await this.getTopics(conversationId,token);
        let actionItems= await this.getActionItems(conversationId,token);
        let transcript= await this.getTranscript(conversationId,token);

        let actionItem= JSON.parse(actionItems).actionItems;
        let actionItemTemp="";
        let topic= JSON.parse(topics).topics;
        let topicTemp="";
        let question= JSON.parse(questions).questions;
        let questionTemp="";
        for(let t=0;t<actionItem.length;t++) {

            actionItemTemp=actionItemTemp+","+actionItem[t].text;
        }
        for(let t=0;t<question.length;t++) {

            questionTemp=questionTemp+","+question[t].text;
        }
        for(let k=0;k<topic.length;k++) {

            topicTemp=topicTemp+","+topic[k].text;
        }
        let tempJsonObject = {
            conversationId: conversationId,
            transcript:JSON.parse(transcript).transcript.payload,
            topics: topicTemp,
            questions: questionTemp,
            actionItems:actionItemTemp
        }
        return tempJsonObject;
    }


}
module.exports=ProcessData;