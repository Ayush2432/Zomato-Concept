import express from "express";
import { RestaurantModel } from "../../database/allModels";

// making the all restaurants available on route routes

const Router = express.Router();


// Validation
import {ValidateRestaurantCity,ValidateRestaurantSearchString} from "../../Validation/restaurant";
import {ValidateRestaurantId} from "../../Validation/food";


// 1-->API for all restaurants 

/* Design of the API or the wire frame of the API

Route         /
Description   (Get all  restaurant details)restaurant based on city
params        none
Access        Public 
Method         GET REquest
*/


Router.get("/",async(req,res) => {
    try{

     await ValidateRestaurantCity(req.query);   
     
    const {city} = req.query;
    const restaurant = await RestaurantModel.find({city});   //here we r tying to find all the restaurant present in that city
    return res.json({restaurant});

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});




// 2-->API for the particular restaurant based on particular id

/* Design of the API or the wire frame of the API

Route         /
Description   Get particular restaurant details on id
params        _id
Access        Public 
Method         GET REquest
*/

Router.get("/:_id",async(req,res) => {          // : is because the id is dynamically changing
    try{


    await ValidateRestaurantId(req.params);

    const {_id} = req.params;
    const restaurant = await RestaurantModel.findOne(_id);

    if(!restaurant)
        return res.status(404).json({error: "Restaurant not found"});
      
        return res.json({restaurant});                           //if no error is there and the restaurant are found on the basis of id then return the res

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});


// 3-->search API for people trying to find restaurant based on whatever search is done by the user

/* Design of the API or the wire frame of the API

Route         /search
Description   Get restaurant details on search
params        none
body          search String
Access        Public 
Method         GET REquest
*/

Router.get("/search",async(req,res) => {        
    try{

    await ValidateRestaurantSearchString(req.body); 

    const {searchString} = req.body;                       //present in the body of ur request after we have accessed it  we will try to search particular restaurant on the basis of searchString
    const restaurants = await RestaurantModel.find({
        name:{ $regex:searchString, $options:"i"}            //regex will go and find out the restaurant with the same substring
    });                                                    //options to not focus on the case of the string ;;upper or lower case
    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});








export default Router;