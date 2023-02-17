import express from "express";
import {ImageModel} from "../../database/allModels";


const Router = express.Router();




// 1-->API for all Images 

/* Design of the API or the wire frame of the API

Route         /
Description   uploading given image to s3 bucket, and saving the file to mongodb
params        None
Access        Public 
Method         GET REquest
*/


// AWS S3 CONFIG

const s3Bucket = new AWS.s3 ({
    accessKeyID: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1"
});






Router.post("/",async(req,res) => {
    try{
        

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});



export default Router;








 