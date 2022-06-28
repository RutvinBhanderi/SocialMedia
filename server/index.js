//imports
import express from "express";
import mongoose from "mongoose";
import postRouter from "./Router/posts.js";
import userRouter from "./Router/user.js";
import cors from "cors";
//app config
const app = express();
const PORT = process.env.PORT || 4000;
const connection_url = "mongodb://localhost/memoriesDark";

//middleware

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/user", userRouter);
app.use("/posts", postRouter);
//db config
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    //listen to the server
    app.listen(PORT, () => {
      console.log(`server is running at ${PORT} `);
    });
  })
  .catch((err) => console.log(err));
