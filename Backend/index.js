const express = require('express');
const app = express();
app.use(express.json());

const db = require('./models'); // cet import est ici pour sequelize

//Routers

const postRouter= require ("./routes/Posts");
app.use ("/posts",postRouter);

db.sequelize.sync().then(()=>{
app.listen(5000,()=>{
    console.log('server is running on port 5000');
});
});

