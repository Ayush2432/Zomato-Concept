import express from "express";
import { FoodModel } from "../../database/allModels";



const Router = express.Router();



// 1-->API for all food based on a particular restaurant

/* Design of the API or the wire frame of the API

Route         /
Description   Get all the food based on particular restaurant
params        _id
Access        Public 
Method         GET REquest
*/


Router.get("/:_id",async(req,res) => {
    try{
        const {_id} = req.params;
        const  foods= await FoodModel.find ({restaurant: _id});                               //we r trying to get the food of that particular restaurant ,the id is of that restaurant
    //   it means we r going to the food model and searching for the restaurant with the given  id and trying to find the food on thar restaurant 
    
    return res.json({foods});

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});




// 2-->API for all food based on a particular category

/* Design of the API or the wire frame of the API

Route         /r
Description   Get all the food based on category
params        category
Access        Public 
Method         GET REquest
*/


Router.get("/r/:category",async(req,res) => {
    try{
        const {category} = req.params;
        const  foods= await FoodModel.find ({
            category: {$regex: category,$options:"i"}
        });                              
    
        
    return res.json({foods});

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});













export default Router;