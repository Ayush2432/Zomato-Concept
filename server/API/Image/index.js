import express from "express";
import AWS from "aws-sdk";
import multer from "multer";             //multer basically help us to upload file
import {ImageModel} from "../../database/allModels";


const Router = express.Router();



// multer config 
const storage = multer.memoryStorage();      //workflow here is first multer is allowing to upload the images to the RAM of server 
const upload = multer({storage});            //now from RAM i want it to upload to the AWS


// AWS S3 CONFIG
const s3Bucket = new AWS.S3 ({
    accessKeyID: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1"
});



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
         
// Function to deal with the upload part (AS AWS upload works in a asynchronous way so we have to make some promises await one to upload the file as it will eventually upload but still we have to give it await)
const s3Upload = (options) => {
    return new Promise((resolve,reject)=>            //either the promise is treated or resolved
      s3Bucket.upload(options,(error,data)=>{       //this tells that the entire upload will be done through s3 bucket which has that key given up
          if(error)  return reject(error);         //if we get error which means our promise was rejected and error is thrown
          return resolve(data);                   //if no error then it will return the resolve one
      })
    );
};

 const uploadImage  = await s3Upload(bucketOptions);

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});



export default Router;








 