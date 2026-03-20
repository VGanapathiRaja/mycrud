const exxpress = require("express");
const {default:mongoose} = require("mongoose");
const cors = require("cors");
const dbSchema = require("./db/schema");
const PORT = 9090;

// frontend set up
const app = exxpress();
app.use(exxpress.json());
app.use(cors());

// backend setup
app.get("/",(req,res)=>{
    res.send("Hello world backend ready!..😊😊👌👌");
    res.end();
});

// create data 
app.post("/cruddata", async(req,res)=>{
        const { username,useremail,usermobile,userpassword} = req.body;
        const fdata = { username,useremail,usermobile,userpassword};
        console.log(fdata);
    try{
        if(!username || !useremail || !usermobile || !userpassword){
            console.log("Data Not received from front end Please fill Form...!😒😒👍👍");
            return res.status(404).json({Error:"Client Error 404 !..😒😒👍👍"});
        }
        else{
            const cruddata =new dbSchema({username,useremail,usermobile,userpassword});
            await cruddata.save();
            console.log("Data saved in database..!😊😊👌👌");
            return res.status(200).json({Messages:"Data Saved in mongo Db successfully..!😊😊👌👌"})
        }
    }
    catch(err){
        if(err){
            console.log("backend not run",err)
            return res.status(505).json({Error: "Server Error 505 !...😒😒👍👍"});
        }
    }       
});

//Read Data

app.get("/cdata",async(req,res)=>{
    try{
        const cdata = await dbSchema.find();
        res.json(cdata);
    }
    catch(err){
        if(err) throw err;
        console.log("not getting data",err);
        return res.status(500).json({Error:"Data not sent to frontend 505"});
    }
});

//Update Data 
app.put("/update/:id", async(req,res)=>{
    try{
        const updateCdata = await dbSchema.findByIdAndUpdate(req.param.id, req.body, {new:true});
        res.json(updateCdata);
    }
    catch(err){
        if(err){
            console.log("not getting data",err);
            return res.status(500).json({Error:"Data not sent to frontend 505"});
        }
    };
});

// database setup
mongoose.connect("mongodb://localhost:27017/Crudapp")
.then(()=>{console.log("Mongo db Connected successfully!!..👌👌😊😊")})
.catch((err)=>{
    console.log("Mongo db Not Connected!!..😒😒👍👍 ", err)
})

// deployaments sentupd
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`server running on port ${PORT}`);
});