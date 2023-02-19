import express from "express";
import { ReviewModel } from "../../database/allModels";


const Router = express.Router();

// Validation
import { ValidateReviewData} from "../../Validation/review";



// 1-->API for all reviews 

/* Design of the API or the wire frame of the API

We cannot give reviews to both restaurant and order at the same time so we will create a boolean value based on
that value determining that review is for the restaurant or the order we will create this API --so that not to create 2 separate API


Route         /new
Description   Add new review
params        none
BODY          Review object
Access        Public 
Method         POST REquest
*/


Router.get("/new",async(req,res) => {
    try{
     
        const {reviewData} = req.body;

        await ReviewModel.create(reviewData);
        return res.json({review:"Successfully Created Review"});

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});




// 2-->API for deleting the reviews

/* Design of the API or the wire frame of the API

Route         /delete
Description   Deleting the review
params        will be based on the id of the review
Access        Public 
Method        DELETE
*/


Router.get("/delete/:_id",async(req,res) => {
    try{
        await ValidateReviewData(req.params);
     
    const {_id} = req.params;
    
    await ReviewModel.findByIdAndDelete(_id);
    return res.json({review:"Successfully Deleted Review"});
    
    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});







export default Router;