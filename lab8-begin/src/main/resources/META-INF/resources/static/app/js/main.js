var wafepaApp = angular.module('wafepaApp', ['ngRoute',
                                             
                                             'wafepaApp.controllers',
                                             'wafepaApp.directives',
                                             'wafepaApp.services',
                                             'wafepaApp.routes',
                                             'angularUtils.directives.dirPagination',
                                             'ui.bootstrap',
                                             'angular-confirm'
                                             ]);



wafepaApp.filter('reverse', function() {
	  return function(items) {
	    return items.slice().reverse();
	  };
	});
//
//wafepaApp.factory('isNameAvailable', function($q, $http) {
//	  return function(username) {
//	    var deferred = $q.defer();
//
//	    $http.get('/api/activities/?name=' + username).then(function() {
//	      // Found the user, therefore not unique.
//	      deferred.reject();
//	    }, function() {
//	      // User not found, therefore unique!
//	      deferred.resolve();
//	    });
//
//	    return deferred.promise;
//	  }
//	});




