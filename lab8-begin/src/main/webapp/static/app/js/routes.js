var wafepaApp = angular.module('wafepaApp.routes', ['ngRoute']);

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller: 'ActivityController'
        })
        .when('/activities/add', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller: 'ActivityController'
        })
        .when('/activities/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditActivity.html',
            controller: 'ActivityController'
        })
         .when('/users', {
            templateUrl : '/static/app/html/partial/users.html',
            controller: 'UserController'
        })
        .when('/users/add', {
            templateUrl : '/static/app/html/partial/addEditUser.html',
            controller: 'UserController'
        })
        .when('/playlist', {
            templateUrl : '/static/app/html/partial/bbcRadioPlaylist.html',
            controller: 'BBCController'
        })
        .when('/filmovi', {
            templateUrl : '/static/app/html/partial/filmovi.html',
            controller: 'movieController'
        })
        .when('/prognoza', {
            templateUrl : '/static/app/html/partial/prognoza.html',
            controller: 'vremeController'
        })
        .when('/users/edit/:id', {
            templateUrl : '/static/app/html/partial/addEditAddress.html',
            controller: 'UserController'
        })

        .otherwise({
            redirectTo: '/'
        });
}]);