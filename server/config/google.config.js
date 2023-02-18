// THIS IS THE BASIC TEMPLATE FOR GOOGLE AUTH CONFIGURATION WE JUST NEED TO CHANGE THE BASIC CLIENT ID AND CLIENT SECRET AND URL ELSE EVERYTHING WILL BE SAME WITH SOME CHANGES IF REQUIRED


import googleOAuth from "passport-google-oauth20";

import {UserModel} from "../database/allModels";

/*now we will create a const and try to access the google strategy method 
its kind of authentication strategy provided to authentication users
 */

const GoogleStrategy = googleOAuth.Strategy;


export default (passport) => {
    passport.use(    //basically use has 2 params one is first is GoogleStrategy thing that would be accepting some key value pairs and 2nd param will be the call back function
        new GoogleStrategy({
            clientID:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:"http://localhost:4000/auth/google/callback"
        },
        async(accessToken,refreshToken,profile,done)=>{
            const newUser={                             //basically creating the new user
                fullName:profile.displayName,
                email:profile.emails[0].value,
                profilePic:profile.photos[0].value 
            };
            try{
              const user = await UserModel.findOne({email:newUser.email});     //in this basically try and catch we created a user seeing that whether the email is matching with email given or not
                                                                              //so it generates a token if this exists then done we r sending the user and the token if not then we r creating  a new user if any error is there then we r catching that error
              if(user){

                const token = user.generateJwtToken(); 
                
                done(null,{user,token});
              }
              else{
                const user = await UserModel.create(newUser);    //creating user and returning it
                
                const token = user.generateJwtToken(); 
                
                done(null,{user,token});
              }
            }
            catch(error){
                done(error,null);
            }
        }
        
        )
        );

// passport-- its the authentication middleware we will be using this centralize or decentralize something

passport.serializeUser((userData,done) => done(null,{...userData}));
passport.deserializeUser((id,done) => done(null,id));


}