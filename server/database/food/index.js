import mongoose from "mongoose";

// creating the schema

const FoodSchema = new  mongoose.Schema({
     name: {type: String, required: true},
     description: {type: String, required: true},
     isVeg: {type: Boolean, required: true},
     isContainsEgg: {type: Boolean, required: true},
     category: {type: String, required: true},
     photos:{
        type: mongoose.Types.ObjectId,
        ref:"Images"
     },
     price: {type: Number,default: 150 ,required:true},
     addOns:[
        {
            type: mongoose.Types.ObjectId,
            ref:"Foods"
        }
     ],
     restaurant:{
        type: mongoose.Types.ObjectId,
        ref:"Restaurants",
        required:true
     }
     
},
{
   timestamps:true
}
); //here we r linking the image schema to the photo so we require 
    // this type and we have to define where we are refering to
    // same concept as primary key and foreign key


export const FoodModel = mongoose.model("Foods",FoodSchema);