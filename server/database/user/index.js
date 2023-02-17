import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// creating the schema

const UserSchema = new  mongoose.Schema({
     fullName:{type: String,required :true},
     email:{type: String,required :true},
     password:{type: String},
     address:[{detail:{type: String},for:{type:String}}],
     phoneNumber: [{type:Number,required :true}]
},
{
    timestamps:true
 }
 );


//  using static and method creating this function which will check that the entered email and phone is already present or not


// function to  replace JWTToken  statement one

UserSchema.methods.generateJwtToken = function(){
  return jwt.sign({user:this._id.toString()},"ZomatoApp");
};


// static for signup option
UserSchema.statics.findEmailAndPhone = async({email,phoneNumber}) =>{

// check whether the email exists or not
const checkUserByEmail = await UserModel.findOne({email});

// check whether the phone exists or not 
const checkUserByPhone = await UserModel.findOne({phoneNumber});

if(checkUserByEmail || checkUserByPhone){       //if these entered things already are present then throw the error
     throw new Error("User already Exists");
 }

 return false;   //if function will not find the matches so returning false
};


// static for sign in option 
UserSchema.statics.findByEmailAndPassword = async({email,password}) =>{

     // check whether the email exists or not in the db
     const user = await UserModel.findOne({email});

     //  putting a condition if the user does not exist 
     if(!user) throw new Error("User Does Not Exist")
     
     // check whether the password matches or not
     const doesPasswordMatch = await bcrypt.compare(password,user.password);   //password will be the actual password stored and user.password will be the password which he is entering
     
     if(!doesPasswordMatch){       //if the stored and the current entering password does not match then throw the error
          throw new Error("Invalid Password");
      }
     
      return user;   //if function will match the password then user can enter 
};
     



//we can do this to replace the bcrypt part in the main index

UserSchema.pre("save",function(next){
     const user = this;
  
     // password is not modified
     if(!user.isModified("password")) return next();

    //generating bcrypt salt
     bcrypt.genSalt(8,(error,salt) => {
          if(error) return next(error);
     
     // hashing the password
     bcrypt.hash(user.password,salt,(error,hash)=>{
          if(error) return next(error);

     // assigning hashed password
     user.password = hash;
     return next();
     });
   });
});




export const UserModel = mongoose.model("Users",UserSchema);