var wafepaApp = angular.module('wafepaApp.directives', []);

wafepaApp.directive('activitiesTable', function() {
    return {
        restrict: 'E',                          // moguće vrednosti: 'A' (attribute), 'E' (element), 'C' (class), 'M' (comment)
        templateUrl: '/static/app/html/partial/activitiesTable.html',    // putanja ka fajlu koji sadrži HTML (koristi se ovo ILI template, ne oba)
        controller: 'ActivityController'              // kontroler
    }
});


wafepaApp.directive('users', function() {
    return {
        restrict: 'E',                          // moguće vrednosti: 'A' (attribute), 'E' (element), 'C' (class), 'M' (comment)
        templateUrl: '/static/app/html/partial/users.html',    // putanja ka fajlu koji sadrži HTML (koristi se ovo ILI template, ne oba)
        controller: 'UserController'+'AddressController'             // kontroler
    }
});

wafepaApp.directive('lista', function() {
    return {
        restrict: 'E',                          // moguće vrednosti: 'A' (attribute), 'E' (element), 'C' (class), 'M' (comment)
        templateUrl: '/static/app/html/partial/bbcRadioPlaylist.html',    // putanja ka fajlu koji sadrži HTML (koristi se ovo ILI template, ne oba)
        controller: 'BBCController'              // kontroler
    }
});

//wafepaApp.directive('uniqueUsername', function(isNameAvailable) {
//	  return {
//	    restrict: 'A',
//	    require: 'ngModel',
//	    link: function(scope, element, attrs, ngModel) {
//	      ngModel.$asyncValidators.unique = isNameAvailable;
//	    }
//	  };
//	});