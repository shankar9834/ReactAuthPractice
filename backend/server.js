const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const jwt=require('jsonwebtoken');
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


 mongoose
  .connect("mongodb://localhost:27017/react-auth-practice")
  .then(() => {
    
    console.log('connected to backend');


  })
  .catch((err) => {
    console.log("error connecting database", err);
  }); 


  app.get("/", (req, res) => {
    console.log("hittin");
    res.status(200).send("ok");
  });


  app.post("/signup", async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    
    //to delete unnecessary documents
    /* await User.deleteMany({}) */

    const createdUser=new User({email,password});
   // console.log(createdUser);

    await createdUser.save();
    const {_id}=createdUser;
    const token= jwt.sign({_id},'mySecret',{expiresIn:'7d'});
   //  console.log(token);
    res.status(200).json({ email,token});
    
   
  });


  app.post("/login", async(req, res) => {

    try{
       // console.log(req.body);
        const { email, password } = req.body;
        console.log(email, password);
    
        const findUser=await User.findOne({email});
        // console.log(findUser);
        
       const {_id}=findUser;
       const token= jwt.sign({_id},'mySecret',{expiresIn:'7d'});
      //  console.log(token);
       res.status(200).json({ email,token});
    }
    catch(err){
        res.status(404).json({ msg:err.msg });
    }   
    
     
   
  });


app.listen(3005, (req, res) => {
  console.log("listening on port 3005");
});
