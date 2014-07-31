

// Global:


function ridesController($scope, $http) {
    $scope.rides = [];
    
    $scope.newRide = {};

    $scope.deleteRide = function(ride)
    {

    }

    $scope.addRide = function ()
	{
	
    	console.log($scope.newRide);
	
        $http({method: 'POST', url: '/addride', data: $scope.newRide}).
        success(function(data, status, headers, config) {
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

            $scope.rides=data;
        }).
        error(function(data, status, headers, config) {

        });

    };

    populateRides($http);

};


