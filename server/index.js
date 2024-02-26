const Express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = Express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://admin:Z2yhUWFDze37O2Hh@cluster0.m54yfvr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DATABASE_NAME = "valorantdb";
const COLLECTION_NAME = "valorantcollection"; 
var database;

app.listen(5069, () => {
    MongoClient.connect(CONNECTION_STRING, (error, client) => {
        if (error) {
            console.error("Error connecting to MongoDB:", error);
            return;
        }
        database = client.db(DATABASE_NAME);
        console.log("MongoDB Connection Successful!");
    });
});
