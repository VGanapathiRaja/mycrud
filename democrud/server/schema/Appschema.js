const mongoose = require('mongoose');

const myappSchema  = new mongoose.Schema({
    lname:
    {type:String,
        required:true 
     },
    lemail:{
        type:String,
        required:true   
    },
    lmobile:{
        type:String,
        required:true  
    }
    },
    {
        timestamps:true,
        collection:"Loginusers"
    });
    module.exports = mongoose.model("Loginusers",myappSchema,"Loginusers");