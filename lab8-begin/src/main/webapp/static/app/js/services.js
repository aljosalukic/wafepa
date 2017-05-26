var wafepaApp = angular.module('wafepaApp.services', []);

wafepaApp.service('activityService', function($http) {
	
	this.url = 'api/activities';
	
	this.deleteActivity = function(id) {
		return $http.delete(this.url + '/' + id);
	};
	
	this.getActivity = function(id) {
		return $http.get(this.url + '/' + id);
	}
	
	this.getActivities = function(requestParams) {
		return $http.get(this.url, { params: requestParams });
	};
	
	this.getActivityByName = function(name){
		return $http.get(this.url + '/' + name);
	};
	
	this.saveActivity = function(activity) {
		if (activity.id) {
			return $http.put(this.url + '/' + activity.id, activity);
		} else {
			return $http.post(this.url, activity);
		}
	};
});

wafepaApp.service('userService',function($http){
	
	this.url = 'api/users';
	
	this.getUsers = function(reqestParams){
		return $http.get(this.url,{params:reqestParams});
	};
	this.deleteUser = function(id) {
		return $http.delete(this.url + '/' + id);
	};
	this.getUser = function(id) {
		return $http.get(this.url + '/' + id);
	};
	this.saveUser = function(user) {
		if (user.id) {
			return $http.put(this.url + '/' + user.id, user);
		} else {
			return $http.post(this.url, user);
		}
	};
	
});	

	
//wafepaApp.service('bbcService',function($http){
//	this.url = 'http://www.bbc.co.uk/radio1/playlist.json?callback=JSON_CALLBACK';
//	this.getList = function(){
//		return $http.get(this.url);
//	};
//});

