const mongoose = require('mongoose');
const Schemma = new mongoose.Schema({
    uname:{type: String, required: true},
    uemail:{type: String, required: true},
    umobile:{type: Number, required: true}
},{collection:"Crudapp"});
module.exports = mongoose.model('Crudapp', Schemma,"Crudapp");