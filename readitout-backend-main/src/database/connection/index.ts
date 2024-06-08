import config from "config";
import mongoose from "mongoose";
import express from "express";
const mongooseConnection = express();
// const dbUrl: any = config.get("db_url"); // for server
const dbUrl: any = config.get("db_local"); // for localhost
console.log(dbUrl);

mongoose
  .connect(dbUrl, //  "mongodb+srv://dinesh06sidhman:08mLC8lXCtWIUYo5@msl.8cdkeht.mongodb.net/?retryWrites=true&w=majority&appName=MSL"
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((result) => console.log("Database successfully connected"))
  .catch((err) => console.log(err));
export { mongooseConnection };
  