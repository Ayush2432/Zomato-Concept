require('dotenv').config();
import express from "express";
import AWS from "aws-sdk";
import multer from "multer";             //multer basically help us to upload file
import {ImageModel} from "../../database/allModels";

// utilities
import {s3Upload} from "../../Utils/AWS/s3";


const Router = express.Router();



// multer config 
const storage = multer.memoryStorage();      //workflow here is first multer is allowing to upload the images to the RAM of server 
const upload = multer({storage});            //now from RAM i want it to upload to the AWS



// 1-->API for all Images 

/* Design of the API or the wire frame of the API

Route         /
Description   uploading given image to s3 bucket, and saving the file to mongodb
params        None
Access        Public 
Method         GET REquest
*/




Router.post("/",upload.single("file") ,async(req,res) => {
    try{
        const file = req.file;

        // S3 bucket options
        const bucketOptions = { 
              Bucket: "ayush2432pandey",
              Key: file.originalname,
              Body: file.buffer,
              ContentType: file.mimetype,
              ACL: "public-read"
                 };    
         


 const uploadImage  = await s3Upload(bucketOptions);

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});



export default Router;








 