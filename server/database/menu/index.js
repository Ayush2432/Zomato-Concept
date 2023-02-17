import mongoose from "mongoose";

// creating the schemas

const MenuSchema = new mongoose.Schema({   
      menu:
      [
        {
            name:{type:String,required:true},
            items:
            [
                {
                    type: mongoose.Types.ObjectId,
                    ref:"Foods"
                }
            ]
        }
      ],
      recommended:
      [
        {
            type: mongoose.Types.ObjectId,
            ref:"Foods",
            unique:true //it is kept true so that the recommendation does not get repeated
        }
      ]                                      
    
},
{
    timestamps:true
 }
 );




export const MenuModel = mongoose.model("Menus",MenuSchema);