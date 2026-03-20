const mongoose  = require("mongoose");

const myCrudapp = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    useremail: {
        type:String,
        required:true
    },
    usermobile: {
        type:String,
        required:true
    },
    userpassword:{
        type:String,
        required:true
    }
},{
    collation:"cruddata"
})
module.exports = mongoose.model("cruddata",myCrudapp,"cruddata");