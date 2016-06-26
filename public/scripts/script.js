var myApp=angular.module( 'myApp', [] );
// controller petController
myApp.controller( 'petController', [ '$scope', '$http', function( $scope, $http){

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
    $scope.getPets(); // calls get pets function to refresh DOM
  }; // end addPets function

  $scope.getPets = function(){  // gets current recordset upon button click
    $http({   // gets recordset via GET
      method: 'GET',
      url: '/view',
    }).then( function( response ){  // success call - runs function with response parameter
      console.log(response);
      $scope.allThePets = response.data;  // pulls the data from app.js and sets to allThePets
    }, function myError( response ){
  console.log( response.statusText );
  }); // end error function
  }; // end getPets function


  // $scope.removePet = function(petId){ // deletes record on button click - DOES NOT WORK
  //   $http({  // removes object via REMOVE
  //     method: 'DELETE',
  //     url: '/petscollection/' + petId,
  //   }); // end remove call
  //   success(function (data) {  // success message
  //       $scope.status = "Pet Deleted";
  //       $scope.getPets(); // calls get pets function to refresh DOM
  //   }) //end success
  //   .error(function (error) {  // error message
  //       $scope.status = 'Unable to delete pet: ' + error.message;
    // }); //end error
  // }; // end deletePets function

}]); // end controller

angular.module('app', []) // runs function upon page load - DOES NOT APPEAR TO BE DOING ANYTHING- SHIFTLESS LAZY BIT OF CODE..
  .controller('petsController', ['$scope', function($scope) {
    $scope.getPets();
}]); // end page load function
