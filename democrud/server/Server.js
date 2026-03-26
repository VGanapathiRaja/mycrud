const  express = require('express');
const cors = require('cors');
const {default:mongoose} = require('mongoose');
const PORT = 5000;

// fe 
const app = express();
app.use(cors());
app.use(express.json());

//Db
    const mydb= require("./schema/Modal");
    mongoose.connect("mongodb://localhost:27017/Crudapp")
    .then(()=>{console.log("Db connected")})
    .catch((err)=>{console.log("Db Not connected",err)});

//be 

app.get('/',(req,res)=>{
    res.send("hello world");    
    res.end();
});

//create data

app.post("/adduser",async(req,res)=>{
    try{
        const {uname,uemail,umobile} = req.body;
        const Fdata = {uname,uemail,umobile};
        console.log(Fdata);
        if(!uname || !uemail || !umobile){
            console.log("All Fields are Required");
            return res.status(400).json({message:"All Fields are Required"});
        }
        else{
            const dbData = new mydb({uname,uemail,umobile});
            await dbData.save();
            console.log("Data Inserted Successfully");
            return res.status(200).json({message:"Data Inserted Successfully"});
            }
    }
    catch(err){
        console.log("Data Not Inserted",err);
        return res.status(500).json({message:"Data Not Inserted",error:err});
    };
});

//read data
    app.get("/getusers",async(req,res)=>{
        try{
            const dbusersData = await mydb.find();
            res.json(dbusersData);
            console.log(dbusersData);
            // return res.status(200).json({Messages: "Data Found",data:dbusersData});
        }
        catch(err){
            if(err){
                console.log("Data Not Found",err);
                return res.status(500).json({message:"Data Not Found",error:err});
            }
        };
    });


//update data
    
    app.put("/updateuserdata/:_id", async(req,res)=>{
        try{
            const updateData = await mydb.findByIdAndUpdate(req.params._id, req.body,{new:true});
            res.json(updateData);
            console.log(updateData);
        }
        catch(err){
            if(err) throw err;
            console.log("Data Not Updated",err);
            return res.status(500).json({message:"Data Not Updated",error:err});
        };
    });


//delete data
    app.delete("/deleteuser/:_id", async(req,res)=>{
        try{
            const deleteData = await mydb.findByIdAndDelete(req.params._id);
            res.json(deleteData);
            console.log(deleteData);
        }
        catch(err){
            if(err) throw err;;
            console.log("Data Not Deleted",err);
            return res.status(500).json({message:"Data Not Deleted",error:err});
        };
    });


//deployement 
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`server running on port ${PORT}`);
})



