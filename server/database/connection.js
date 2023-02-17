// this file needs to be created to connect our database

import mongoose from "mongoose";

export default async () => {
  // connecting mongoose with our environment variable then we will be passing some default key values as the default

  return mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); //some setting are avaliable whenever we stack overflow we must configure these settings when connecting to the database
  // the reason to set these settings to true or false are present in the mongoose documentation
};

mongoose.set('strictQuery', true);
