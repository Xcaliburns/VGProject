const express = require('express');
const app = express();
const cors =require ('cors');
require('dotenv').config();

app.use(express.json());
app.use(cors({origin:`http://localhost:5173`,credentials:true}));

const db = require('./models'); // cet import est ici pour sequelize
const port =parseInt(process.env.VITE_DB_HOST ?? "8000", 10);

//Routers
const postRouter= require ('./routes/Posts');
app.use ("/posts",postRouter);

const commentsRouter= require ('./routes/Comments');
app.use ("/comments",commentsRouter);

const usersRouter = require('./routes/Users');
app.use("/users",usersRouter);

const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.listen((port), (err) => {
     if (err) {
    console.log(err);}
else{
    console.log(`Server is running on port ${port}`);}
   
  });
});
