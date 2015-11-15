var garageApp = angular.module("garageApp", ['ngRoute'])
.config(
    function($routeProvider) {
        $routeProvider.
        when("/", {templateUrl:"partials/parkingplacelist.html", controller:"parkingController"}).
        when("/ParkingPlace/", {templateUrl:"partials/parkingplacelist.html", controller:"parkingController"}).
        when("/ParkingPlace/:id", {templateUrl:"partials/parkingplace.html", controller:"parkingplaceController"}).
        otherwise({
                    redirectTo: '/'
                });
    })

.service("spots", ['$http', '$q',
    function spots($http, $q) {
        var spot = this;
        spot.spotList = {};

        spot.GetAllParkingPlaces = function() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'mockup.php',
            })
            .success(function(data){
                spot.spotList = data;
                defer.resolve(data);
            })
            .error(function(err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        spot.GetParkingPlace = function(id) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'mockup.php',
                params: {id : id}
            })
            .success(function(data){
                spot.spotList = data;
                defer.resolve(data);
            })
            .error(function(err) {
                defer.reject(err);
            });

            return defer.promise;
        }

        return spot;
    }])

.controller("parkingController", ['$scope', 'spots', '$timeout', '$q',
    function($scope, spots, $timeout, $q) {
        $scope.init = function() {
            $scope.getAllParkingPlaces();
        }

        $scope.getAllParkingPlaces = function() {
            spots.GetAllParkingPlaces()
            .then(
                function(data) {
                    //success
                    $scope.Spots = spots.spotList;
                },
                function(data) {
                    //error
                    $scope.showMessage("Woops, någonting gick fel!", 2000);
                });
        }

        $scope.init();
    }])

.controller("parkingplaceController", ['$scope', '$interval', 'spots', '$timeout', '$q', '$routeParams',
    function($scope, $interval, spots, $timeout, $q, $routeParams) {
        $scope.init = function() {
            $scope.getParkingPlace();

            stop = $interval(function() {
                $scope.getParkingPlace()
            }, 7000);
        }

        $scope.getParkingPlace = function() {
            spots.GetParkingPlace($routeParams.id)
            .then(
                function(data) {
                    //success
                    $scope.Spots = spots.spotList;
                },
                function(data) {
                    //error
                    $scope.showMessage("Woops, någonting gick fel!", 2000);
                });
        }

        $scope.$on('$destroy', function () {
            if (angular.isDefined(stop)) {
                $interval.cancel(stop);
                stop = undefined;
            }
        });

        $scope.init();
    }])

.controller("AppController", ['$scope', '$interval', 'spots', '$timeout', '$q',
    function($scope, $interval, spots, $timeout, $q) {

        $scope.showMessage = function(msg, time) {
            $scope.Messages = [{Message : msg},];
            $("#message").slideDown(500);
            $timeout(function() {
                $scope.Messages = {};
                $("#message").slideUp(300);
            }, time);
        }

        $scope.close = function(id) {
            $("#"+id).slideUp();
        };
}]);