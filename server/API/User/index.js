import express from "express";
import { UserModel } from "../../database/allModels";


const Router = express.Router();

// Validation
import { ValidateUserId } from "../../Validation/user";



// 1-->API for getting the data of the user based on the id 

/* Design of the API or the wire frame of the API


Route         /
Description   Get an user data
params        _id
BODY          none
Access        Public 
Method         GET REquest
*/


Router.get("/:_id",async(req,res) => {
    try{
     
        const {_id} = req.params;
        const getUser = await UserModel.findById(_id);
        
        return res.json({user:getUser});
    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});


// 2-->API for updating the existing user

/* Design of the API or the wire frame of the API


Route         /update
Description   Update user data
params        _userId
BODY          none
Access        Public 
Method         PUT REquest
*/


Router.put("/update/:_userId",async(req,res) => {
    try{

        await ValidateUserId(req.params);
     
        const {_userId} = req.params;
        const {userData} = req.body;

        const updateUserData = await UserModel.findByIdAndUpdate(
            _userId,
            {
                $set: userData
            },
            {
                new:true
            }
            );
        
        return res.json({user:updateUserData});
    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});






export default Router;