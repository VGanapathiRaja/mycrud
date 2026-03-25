const express = require("express");
const cors = require("cors");
const {default:mongoose} = require("mongoose");
const mydb = require("./schema/Appschema");
const Port = 4000;

const app = express();
app.use(cors());
app.use(express.json());  


mongoose.connect("mongodb://localhost:27017/Crudapp")
.then(()=>{
    console.log("Db Connected Successfully");   
})
.catch((err)=>{
    console.log("Db Not Connected",err);    
});


app.get('/',(req,res)=>{
    res.send("hello world");    
    res.end();
});

//create data
app.post("/adduser", async(req,res)=>{
   try{
    const {lname,lemail,lmobile} = req.body;
    const Fdata = {lname,lemail,lmobile};
    console.log(Fdata);
    if(!lname || !lemail || !lmobile){
        console.log("All Fields are Required");
        return res.status(400).json({message:"All Fields are Required"});
    }   
    else{
        const dbData = new mydb({lname,lemail,lmobile});
        await dbData.save();
        console.log("Data Inserted Successfully");
        return res.status(200).json({message:"Data Inserted Successfully"});
    }   
   }
   catch(err){
    if(err){
        console.log("Data Not Inserted",err);
        return res.status(500).json({message:"Data Not Inserted",error:err});
    }   
   };
})
//read data

app.get("/glogindata",async(req,res)=>{
    try{
        const myGlogindata = await mydb.find();;
        console.log(myGlogindata);
        res.json(myGlogindata);
    }
    catch(err){
        if(err){
            console.log("Data Not Found",err);
            return res.status(500).json({Error:"Data not not Found 500",Error:err});
        }
    }
});














app.listen(Port,(err)=>{
   if(err){
    console.error("Server Not Connected",err);
   }
    else{   
        console.log(`Server Connected Successfully on Port ${Port}`);
    }
});