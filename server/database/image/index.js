// image schema will be used as a key value pair it will be refer in other schemas

import mongoose from "mongoose";

// creating the schemas

const ImageSchema = new mongoose.Schema({   //images would be an array of objects in which various URL will be there 
                                            // storing the location of that particular image
    images: [
        {
         location:{type: String, required:true}
        }
    ]
},
{
    timestamps:true
 }
);




export const ImageModel = mongoose.model("Images",ImageSchema);