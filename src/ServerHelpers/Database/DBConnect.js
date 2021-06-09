const mongoose = require('mongoose')
const { v4: uuidv4 }=require('uuid');

const url = `mongodb+srv://symbl:7UXPV8OMvINNhpJc@cluster0.dmnev.mongodb.net/aggregationdb?retryWrites=true&w=majority`;

function isObject(obj) {
    return Object.keys(obj).length > 0 && obj.constructor === Object;
}
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
class mongoDbClient {
    constructor() {
        this.id="1";
    }
    async connect(){
        try {
            let connection = await mongoose.connect(url,connectionParams).then(()=>{
                console.log("connected to mongodb");
                return connection;
            });
        }
        catch(e) {
        }
    }
    insertUrlsInDB(urls){

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb");
            var myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("customers").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        });

            this.connect()
    }
    idForJobProcessing(){
        return uuidv4();

    }

    async getNextSequence(coll) {

    }

    async insertDocumentWithIndex(coll, doc) {
        try {

        }
        catch(e) {

        }
    }

    async findDocFieldsByFilter(coll, query, projection, lmt) {
        if(!query){
            throw Error("mongoClient.findDocFieldsByFilter: query is not an object");
        }
        return await this.db.collection(coll).find(query, {
            projection: projection || {},
            limit: lmt || 0
        }).toArray();
    }

    async findDocByAggregation(coll, query) {
        if(!query.length){
            throw Error("mongoClient.findDocByAggregation: query is not an object");
        }
        return this.db.collection(coll).aggregate(query).toArray();
    }

    async getDocumentCountByQuery(coll, query) {
        return this.db.collection(coll).estimatedDocumentCount(query || {})
    }

    async findOneAndUpdate(coll, query, values, option) {
        if(!(isObject(values) && isObject(query))){
            throw Error("mongoClient.UpdateDocument: values and query should be an object");
        }
        return this.db.collection(coll).findOneAndUpdate(query, {$set : values}, option || {})
    }

    async modifyOneDocument(coll, query, values, option) {
        if(!(isObject(values) && isObject(query))){
            throw Error("mongoClient.ModifyOneDocument: values, query and option should be an object");
        }
        return await this.db.collection(coll).updateOne(query, values, option || {})
    }

    async close() {
        return this.db.close();
    }

}

module.exports= mongoDbClient;