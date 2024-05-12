
import express from "express";

import dotenv from 'dotenv';
import mongoose from "mongoose";
import Strapi from "./models/strapi.js";

const PORT=process.env.PORT || 5000;

dotenv.config();
const app = express();
app.use(express.json());

const connectMongoDB=async()=>{try{
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if(conn){
        console.log("api is working")
    }
    }catch(e){
    console.log(e)
}
  
};
connectMongoDB();

// adding user 

app.post('/users' , async(req,res)=>{
    try{

    const{name,email,mobile,birthday}=req.body;
    const newStrapi= new Strapi({
        name:name,
        email:email,
        mobile:mobile,
        birthday:birthday,
        
    });

    const savedStrapi = await newStrapi.save();

    res.send({
        success:true,
        data:savedStrapi,
        message:"user added  successfully !!!"
    })
}catch(e){
    res.send({
        success:false,
        message:e.message
    })
}

});
/// fetching users

app.get('/users',async(req,res)=>{

    try{
     const totalApi= await Strapi.find();

    res.send({
        success:true,
        data:totalApi,
        message:"total data is fetched"
    })
    }catch(e){
        res.send({
            success:true,
            message:e.message
        })
    }
    

})


// delete api

app.delete('/users/:id', async(req,res)=>{
    try{
        const {id}= req.params;
        await Strapi.deleteOne({_id:id});

        res.send({
            success:true,
            message:`${id} user is deleted`
        })
    }catch(e){
        res.send({
            success:false,
            message:e.message
        })
    }
})


app.get("/students", (req, res) => {
  res.json("students");
});
app.listen(PORT, () => {
  console.log("Listening on port 5000");
});