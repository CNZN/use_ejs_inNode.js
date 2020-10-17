const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/0910',{useNewUrlParser: true,useUnifiedTopology: true})
const Schema = mongoose.Schema;
const peopleSchema = new Schema({
    username:{
        type:String,
        dafault:''
    }
})
const People  = mongoose.model('People',peopleSchema,'people');
module.exports = People;