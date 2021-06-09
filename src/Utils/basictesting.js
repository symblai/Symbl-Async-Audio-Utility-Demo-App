urls="https://symbltestdata.s3.us-east-2.amazonaws.com/NeerajTest/Enthu.ai/1.mp3,https://symbltestdata.s3.us-east-2.amazonaws.com/NeerajTest/Enthu.ai/1.mp3,https://symbltestdata.s3.us-east-2.amazonaws.com/NeerajTest/Enthu.ai/1.mp3,https://symbltestdata.s3.us-east-2.amazonaws.com/NeerajTest/Enthu.ai/1.mp3,https://symbltestdata.s3.us-east-2.amazonaws.com/NeerajTest/Enthu.ai/1.mp3,https://symbltestdata.s3.us-east-2.amazonaws.com/NeerajTest/Enthu.ai/1.mp3,"
    let stack =[]
function makeUrlList(urls){
    stack=urls.split(',')
        .map((url) => url.trim())
        .filter((url) => url.length !== 0);
    return stack;
}
stack=urls.split(",");
console.log((stack.pop()).split(" ").join(""));
console.log((stack.pop()).split(" ").join(""));
console.log((stack.pop()).split(" ").join(""));



let t= [{"conversationId":"5600851496271872","topics":",call hippo,outbound,phone number,mobile games,registration certificate,administrative region,business registration","questions":""}];
console.log((JSON.stringify(t)).includes(5600851496271872));
let conversationData=[{"conversationId":"5679620189847552","url":"https://symbltestdata.s3.us-east-2.amazonaws.com/NeerajTest/Enthu.ai/1.mp3","status":"In Progress","jobId":"caa7a254-9c8d-4f8f-8d79-6fd2f1b1dfd3"}];
console.log(conversationData[0].status);
console.log( makeUrlList(urls));