

// Global:


function ridesController($scope, $http) {
    $scope.rides = [];
    
    $scope.newRide = {};

    $scope.deleteRide = function(ride)
    {
        var isOk = confirm('are you sure?');
 
        if (isOk){
            $http({method: 'DELETE', url: '/deleteride/' +ride._id}).
            success(function(data, status, headers, config) {
                $scope.rides.splice($scope.rides.indexOf(ride),1);
            }).
            error(function(data, status, headers, config) {

            });
        }
   
    }

    $scope.showNumber = function(ride){
        alert(ride.phone)
    };

    $scope.showEmail = function(ride){
        alert(ride.email)
    };

    $scope.addPassenger =function(ride)
    {
        if (!ride.passengers) ride.passengers = [];

        $http({method: 'POST', url: '/addPassenger', data: {rideId : ride._id, newPassenger: ride.newPassenger }}).
        success(function(data, status, headers, config) {
            ride.passengers.push(ride.newPassenger);

            ride.newPassenger = {};
           
        }).
        error(function(data, status, headers, config) {

        });


    }


    $scope.addRide = function ()
	{
	
    	console.log($scope.newRide);
	
        $http({method: 'POST', url: '/addride', data: $scope.newRide}).
        success(function(data, status, headers, config) {
            
            if(!$scope.rides) $scope.rides = [];
            
            $scope.rides.push($scope.newRide);
            $scope.newRide = {};
           
        }).
        error(function(data, status, headers, config) {

        });

    };

    function populateRides($http)
    {
        $http({method: 'GET', url: '/ridelist'}).
        success(function(data, status, headers, config) {
            console.log(data);

            for (var i = data.length - 1; i >= 0; i--) {
                data[i].newPassenger = {};
            };

            $scope.rides=data;
        }).
        error(function(data, status, headers, config) {

        });

    };

    populateRides($http);

};


