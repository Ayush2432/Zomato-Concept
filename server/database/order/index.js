import mongoose from "mongoose";

// creating the schemas

const OrderSchema = new mongoose.Schema({   
       user:
       {
        type:mongoose.Types.ObjectId,
        ref:"Users"
       },
       
       orderDetails:
       [
        {
            food:{type:mongoose.Types.ObjectId, ref:"Foods"},
            quantity:{type:Number,required:true},
            paymode:{type:String,required:true},
            status:{type:String,default:"Placed"},
            paymentDetails:
            {
             itemTotals:{type:Number,required:true},
             promo:{type:Number,required:true},
             tax:{type:Number,required:true}
            }
        }
       ],

       orderRatings:{type:Number,required:true}
    
},//to keep track of the whole object we put timestamp at the end
 {
    timestamps:true
 }
);




export const OrderModel = mongoose.model("Orders",OrderSchema);