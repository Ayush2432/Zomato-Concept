import AWS from "aws-sdk";
require("dotenv").config();

// AWS S3 CONFIG
const s3Bucket = new AWS.S3 ({
    accessKeyID: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
    region: "ap-south-1"
});


// Function to deal with the upload part (AS AWS upload works in a asynchronous way so we have to make some promises await one to upload the file as it will eventually upload but still we have to give it await)
 export const s3Upload = (options) => {
    return new Promise((resolve,reject)=>            //either the promise is treated or resolved
      s3Bucket.upload(options,(error,data)=>{       //this tells that the entire upload will be done through s3 bucket which has that key given up
          if(error)  return reject(error);         //if we get error which means our promise was rejected and error is thrown
          return resolve(data);                   //if no error then it will return the resolve one
      })
    );
};