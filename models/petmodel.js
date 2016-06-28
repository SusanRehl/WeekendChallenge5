var mongoose = require('mongoose');  // require mongoose for mongo db

var ourSchema = new mongoose.Schema({  // set up new mongoose schema. If don't use new, have to create the schema in db in terminal first.
  name: String,
  animal: String,
  age: Number,
  image: String
});

var nupets = mongoose.model( 'nupets', ourSchema );  // sets schema to model var, 'nupets' param creates nupets collection

module.exports=nupets;
