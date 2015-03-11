var garageApp = angular.module("garageApp", [])

.service("spots", function spots($http, $q, $rootScope) {
    var spot = this;
    spot.spotList = {};

    spot.GetSpots = function() {
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

    return spot;
})

.controller("AppController", ['$scope', '$interval', 'spots', '$timeout', '$q',
    function($scope, $interval, spots, $timeout, $q) {
        $scope.init = function() {

            $scope.Spots = $scope.getSpots();
            $interval(function() {
                $scope.showMessage("Uppdaterar platser från servern", 2000);
                $scope.getSpots()
            }, 7000);
        }

        $scope.getSpots = function() {
            spots.GetSpots()
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

        $scope.showMessage = function(msg, time) {
            $scope.Messages = [{Message : msg},];
            $("#message").slideDown(500);
            $timeout(function() {
                $scope.Messages = {};
                $("#message").slideUp(300);
            }, time);
        }

        /*var fetchRequest = null;
        $interval(function() {
            if(fetchRequest) { fetchRequest.resolve(); }
            fetchRequest = $q.defer();

            $scope.Messages = [{Message: "Uppdaterar platser från servern" },];
            $("#message").slideDown("slow");
            $http({
                method: 'GET',
                url: 'http://nikz.se/projects/angular/garage/mockup.php',
            }).success(function(data) {
                $timeout(function() {
                    $scope.Messages = {};
                    $("#message").slideUp("slow");
                    //Move out of timer for live update
                    $scope.Spots = data;
                }, 2000);
            });
        }, 7000);*/

        $scope.close = function(id) {
            $("#"+id).slideUp();
        };

        $scope.Messages;
        $scope.Spots = {};

        $scope.init();
}]);