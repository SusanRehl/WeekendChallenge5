var myApp=angular.module( 'myApp', [] );

var allThePets=[]; // creates array used in deleting individual records, matches ng-repeat param in index.html

myApp.controller( 'addController', [ '$scope', '$http', function( $scope, $http){

  $scope.addPet = function(){ // adds record on button click
    event.preventDefault();
    var objectToSend ={  // package object to send, with inputs
      name: $scope.petNameBinder,  // reference these in html
      animal: $scope.petAnimalBinder,
      age: $scope.petAgeBinder,
      image: $scope.imageBinder
    }; // end object
    $http({  // sends object via POST
      method: 'POST',
      url: '/add',
      data: objectToSend
    }); // end post call
    $scope.petNameBinder =''; // clears input boxes
    $scope.petAnimalBinder ='';
    $scope.petAgeBinder ='';
    $scope.imageBinder = "";
    console.log(objectToSend);
  }; // end addPets function
}]);  //end addCOntroller

myApp.controller( 'viewController', [ '$scope', '$http', function( $scope, $http){

  $scope.getPets = function(){  // gets current recordset upon page load
    $http({   // gets recordset via GET
      method: 'GET',
      url: '/viewPets',
    }).then( function( response ){  // success call - runs function with response parameter
      console.log(response);
      $scope.allThePets = response.data;  // pulls the data from app.js and sets to allThePets
    }, function myError( response ){
  console.log( response.statusText );
  }); // end error function
  }; // end getPets function

  $scope.deletePet = function(index){ // deletes pet on button click
    var petToDelete = $scope.allThePets[index];  // removes the pet from the Dom
    $scope.allThePets.splice(index, 1);
    // console.log(petToDelete._id);
    var petId = {id: petToDelete._id};  // creating object with the db id to send to server
    $http({
      method: 'POST',
      url: '/deletePet',
      data: petId
    }); // end post
  }; // end deletePets function
}]); // end viewController
