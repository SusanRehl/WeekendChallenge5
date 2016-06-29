var express = require('express');  // require express
var app=express();
var path = require('path');  // sets up basic path
var bodyParser = require('body-parser');  // require bodyparser for POST calls
var nupets=require('../models/petmodel.js');  // requiring the petmodel.js model
var mongoose = require('mongoose');  // require mongoose for mongo db

app.use( bodyParser.json() );

mongoose.connect('localhost:27017/petsdb');  //no / after localhost!

app.get( '/', function( req, res ){    // set basic url
  res.sendFile( path.resolve( 'views/index.html' ) );
});

app.get( '/view', function( req, res ){  // GET function to retrieve data
  res.sendFile( path.resolve( 'views/view.html' ) );
  });

app.get('/viewPets', function(req, res){
  nupets.find().then( function( data ){  // MAGIC! - all new and existing are found here// similar to ajax get call - if found, then run function with data as parameter
      // console.log("data from app" + data);
    res.send( data );  // returns records as "data"
  });
});

app.get( '/add', function( req, res ){  // GET function to retrieve data
  res.sendFile( path.resolve( 'views/add.html' ) );
  });

app.get( '/addPet', function( req, res ){  // GET function to retrieve data
  nupets.find().then( function( data ){  // MAGIC! - all new and existing are found here// similar to ajax get call - if found, then run function with data as parameter
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
  var newRecord=nupets( recordToAdd );  // saves record to database - use nupets - match what's on line 5
  newRecord.save();
  console.log("new record from app.post: " + newRecord);
});  // end post


//Lukas' code
app.post('/newPet', function(req, res){
	var newPet = new Pets( {
	  name: req.body.name,
 	 animal_type: req.body.type,
	  age_years: req.body.age,
	  img_url: req.body.img_url
	});
  	newPet.save(function(err){
 	   if(err) {
 	     console.log(err);
 	   } else {
  	    console.log('Pet saved successfully!');
 	     res.sendStatus(200);
	    }
	  });
});






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
