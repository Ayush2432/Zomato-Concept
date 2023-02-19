// just a package for validation which makes our work easier we can put certain restriction that this rules are  to be followed while entering this thing and this is compulsory as nowadays we do it while entering password that everything is needed
// without this a lot of if else statement are required but after importing this package we can do it by using certain keywords
// 

import joi from "joi";

export const ValidateSignup = (userData) =>{       //first we r validating the thing which are required during the sign up
                                                  // we r trying  to validate all the fields present inside the schema
const Schema = joi.object({
    fullName: joi.string().required().min(4),        //here we r just giving the validation that while signing up the se are fields are required in this particular format or otherwise we cannot the work what we came for
    email: joi.string().email(),
    password: joi.string().min(8),
    address: joi.array().items(joi.object({detail:joi.string(),for:joi.string()})),                    //here we r telling we r having a array format where we have items which are in a separate format
    phoneNumber:joi.number()
});

return Schema.validateAsync(userData);

};



export const ValidateSignin = (userData) =>{              //as while signing in we require on email and password so we will only validate both of them    
    
const Schema = joi.object({        
    email: joi.string().email().required(),
    password: joi.string().min(8).required()
});

return Schema.validateAsync(userData);

};