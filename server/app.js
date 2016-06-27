var express = require('express');  // require express
var app=express();
var path = require('path');  // sets up basic path
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var nupets=require('../models/petmodel.js');  // requiring the petmodel.js model
var mongoose = require('mongoose');  // require mongoose for mongo db

app.use( bodyParser.json() );

mongoose.connect('localhost:/27017/petsdb');

app.get( '/', function( req, res ){    // set basic url
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.get( '/view', function( req, res ){  // GET function to retrieve data
  nupets.find() // MAGIC! - all new and existing are found here
  .then( function( data ){  // similar to ajax get call - if found, then run function with data as parameter
    // console.log("data from app" + data);
    res.send( data );  // returns records as "data"
  });
}); //end get

app.listen( 8080, 'localhost', function( req, res ){ // spins up server
  console.log( 'listening on 8080' );
}); // end listen

app.post( '/add', function( req, res ){  // POST call
  var recordToAdd={  // adds record from input
    name: req.body.name,
    animal: req.body.animal,
    age: req.body.age,
    image: req.body.image
  };  // end var
  var newRecord=nupets( recordToAdd );  // saves record to database
  newRecord.save();
  console.log("new record from app.post: " + newRecord);
});  // end post

app.post('/deletePet', function(req, res) {  // delete pet
  console.log(req.body.id);
  nupets.findOne({'_id': req.body.id}, function(err, pet){
    if(err){
      console.log(err);
    }else{
  nupets.remove({'_id': req.body.id}, function(err) {
    if(err){
      console.log('remove ' + err);
    }else{
    }
  });
}
});
}); //end delete function

app.use( express.static( 'public' ) );  // make public folder available
