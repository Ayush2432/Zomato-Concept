import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//to prevent reloading and to render only required component we require router in API
const Router = express.Router();

// import models
import {UserModel}from "../../database/user"


// creating API for authentication and authorization to do that we have to first design our API


// 1-->Auth API

/* Design of the API or the wireframe of the API

Route         /signup
Description   signup with email and password
params        none
Access        Public 
Method        Post REquest
*/

Router.post("/signup",async(req,res) =>{
    try{
     
    await UserModel.findEmailAndPhone(req.body.credentials);     //using the instance tha twe created int the user model itself

    // DB
    const newUser = await UserModel.create(req.body.credentials);

    // Jwt Auth Token--2 keep the environment secure as we deal with various parties and fetch or give data
     const token = newUser.generateJwtToken();

     return res.status(200).json({token});  //if everything goes fine response with 200 statement

    }
    catch (error) {
        return res.status(500).json({error:error.message});  //if this occurs it means the port we r trying to reach cannot be reached some internal 
    }
});




// 2-->Sign in  API

/* Design of the API or the wireframe of the API

Route         /signin
Description   signin with email and password
params        none
Access        Public 
Method        Post Request
*/

Router.post("/signin",async(req,res) =>{
  try{

  const user = await UserModel.findByEmailAndPassword(req.body.credentials);
   
  //  JWT Auth Token
  const token = user.generateJwtToken();

   return res.status(200).json({token,status:"Success"});  //if everything goes fine response with 200 statement

  }
  catch (error) {
      return res.status(500).json({error:error.message});  //if this occurs it means the port we r trying to reach cannot be reached some internal 
  }
});



// 3-->Google Auth   API

/* Design of the API or the wireframe of the API

Route         /google
Description   Google SignIn
params        none
Access        Public 
Method        GET Request
*/

Router.get("/google",passport.authenticate("google",{
    scope:[
           "https://www.googleapis.com/auth/userinfo.profile",       //for fetching profile
           " https://www.googleapis.com/auth/userinfo.email"      //for fetching email     
    ],
}) 
);                                                     //this is done then we have to go to the original page where we came from so a callback API is needed





// 3-->after the authentication callback   API

/* Design of the API or the wireframe of the API

Route         /google/callback
Description   Google SignIn
params        none
Access        Public 
Method        GET Request
*/

Router.get("/google/callback",passport.authenticate("google", {failureRedirect:"/"}),
  (req,res) => {
    return res.json({token:req.session.passport.user.token});
  }

); 







export default Router;
