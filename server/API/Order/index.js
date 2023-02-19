import express from "express";
import { OrderModel } from "../../database/allModels";


const Router = express.Router();

// Validation
import { ValidateUserId } from "../../Validation/order";



// 1-->API for all orders based on a id

/* Design of the API or the wire frame of the API

Route         /
Description   Get all the orders on _id
params        _id(of the restaurant)
Access        Public 
Method         GET REquest
*/


Router.get(":_id",async(req,res) => {
    try{
        await ValidateUserId(_id);
        
        const {_id} = req.params;
        const  getOrders = await OrderModel.findOne({user:_id});                  

      if(!getOrders){
        return res.status(404).json({error:error.message});         //if there are no orders then return this error
      }

    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});



// 2-->API for adding a new order

/* Design of the API or the wire frame of the API

Route         /new
Description   Add new orders
params        _id(of the restaurant)
Access        Public 
Method         POST REquest
*/


Router.post("/new/:_id",async(req,res) => {               //here we r first trying to access the order id then based on order id nwe will try to access the order details
    try{
        const {_id} = req.params;
        const {orderDetails} = req.body;
        
        const  addNewOrder = await OrderModel.findOneAndUpdate(        //we r trying to update the order array with the new order we got   we r not creating one because we r having the existing user we r just updating its order array         
            {
                  user: _id
            },
            {
                 $push: {orderDetails: orderDetails}    //the order details which we will fetch from our order body will push it to the orderDEtails of the order  model
            },
            {
                new:true
            }
            );                                                          
         
            return res.json({order:addNewOrder});
    }
    catch(error){

        return res.status(500).json({error: error.message});

    }
});















export default Router;