var mongoose = require('mongoose');  // require mongoose for mongo db

var ourSchema = new mongoose.Schema({  // set up new mongoose schema
  name: String,
  animal: String,
  age: Number,
  image: String
});

var nupets = mongoose.model( 'nupets', ourSchema );  // sets schema to model var

module.exports=nupets;
