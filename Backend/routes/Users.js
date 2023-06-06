const express = require("express");
const router=express.Router();
const { Users } = require("../models");
const bcrypt = require ("bcrypt");
const { Await } = require("react-router-dom");

router.get("/",async(req,res)=>{
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers) ;
});

// router.get("/:id",async (req,res)=>{
//     const id =req.params.id;
//     const user = await Users.findByPk(id);    
//     res.json(user);
// })

router.post("/",async (req,res)=>{
    const {username,hashedpassword}=req.body;
    
    bcrypt.hash(hashedpassword,10).then((password)=>{
        Users.create({
            username: username,
            hashedpassword: password,
        });
        res.json("success");
    });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user){ res.json({ error: "User Doesn't Exist" });}
    else if(user.hashedpassword != null){
  bcrypt.compare(password, user.hashedpassword).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    res.json("YOU LOGGED IN!!!");
  });}
});



module.exports=router;