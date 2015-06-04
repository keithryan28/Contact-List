var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

	var refresh = function(){
		$http.get('/contactlist').success(function(response){
			
			//console.log("i got the data requested");
			$scope.contactlist = response;
			$scope.contact = "";
		});
	};

	refresh();


	$scope.addContact = function (){
		console.log(" details from controller: "+$scope.contact.name);
		//send input data to server
		$http.post('/contactlist', $scope.contact).success(function (response){
			console.log("data coming back on response object: "+response);
			refresh();
		});
	};
    
	$scope.remove = function(id){
		//console.log("id from controller delete req"+id);
		$http.delete('/contactlist/' + id).success(function (response){

		console.log("response data from delete server function: " + response);
		refresh();
	  });

	};

	$scope.edit = function(id){
		console.log("id of object from edit function in controller: "+id);

		var btn = $('#add').attr("disabled", true);

		$http.get('/contactlist/' + id).success(function (response){
			console.log("response from crtl edit function: "+response);
			$scope.contact = response;
		});

	};

	$scope.update = function(){
		console.log($scope.contact._id);

		var btn = $('#add').attr("disabled", false);
		$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

	$scope.deselect = function (){

		var btn = $('#add').attr("disabled", false);
		$scope.contact = "";
	}


}]);