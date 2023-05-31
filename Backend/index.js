const express = require('express');
const app = express();

const db =require('./models'); // cet import est ici pour sequelize


db.sequelize.sync().then(()=>{
app.listen(5000,()=>{
    console.log('server is running on port 5000');
});
});

