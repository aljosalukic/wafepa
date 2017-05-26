var wafepaApp = angular.module('wafepaApp.controllers', []);

wafepaApp.controller('ActivityController', function($scope,$http ,$location, $routeParams, activityService,$window,$confirm) {
	
	$scope.getActivities = function() {
		$scope.hideSpinner = false;
		
		activityService.getActivities({'name': $scope.search, 'page': $scope.page})
				.success(function(data, status, headers) {
					$scope.activities = data;
					$scope.hideSpinner = true;
					$scope.totalPages = headers('total-pages');
					$scope.totalElements = headers('total-elements');
				})
				.error(function() {
					$scope.error = true;
					$scope.hideSpinner = true;
				});
	};
	
	$scope.check = function(name) {
		$scope.djani = false;
		$http.get('/api/activities?name=' + name)
					.success(function(response) {
						var activities = response;
					for(var i = 0; i < activities.length; i ++){
						if(activities[i].name==name){
							$scope.djani = true;
						}
						
					}
						
					})
					.error(function(){
						
						
					})
	
	};
	
	$scope.deleteActivity = function(id) {
		activityService.deleteActivity(id)
				.success(function() {
					$scope.getActivities();
				})
				.error(function() {
					
				});
	};
	
	$scope.initActivity = function() {
		$scope.activity = {};
		
		if ($routeParams.id) { // edit stranica
			activityService.getActivity($routeParams.id)
					.success(function(data) {
						$scope.activity = data;
						$scope.edit = true;
					})
					.error(function() {
						
					});
		}
	};
	
	$scope.saveActivity = function() {
		activityService.saveActivity($scope.activity)
				.success(function() {
					$location.path('/activities');
				})
				.error(function() {
					$scope.djani = true;
				});
	};
	
	$scope.izbrisiAktivnost = function() {
	      $confirm({text: 'Are you sure you want to delete?', title: 'Delete it', ok: 'Yes', cancel: 'No'})
	        .then(function() {
	        	activityService.deleteActivity($routeParams.id)
				.success(function(data) {
					$location.path('/activities');
				})
				.error(function() {
					
				});
	        });
	    };
	
	

	
    
	
// $scope.deleteItem = function(id){
// var msgbox = $dialog.messageBox('Delete Activity ' + activity.name, 'Are you
// sure?', [{label:'Yes, I\'m sure', result: 'yes'},{label:'Nope', result:
// 'no'}]);
// msgbox.open().then(function(result){
// if(result === 'yes') {
// activityService.deleteActivity(id)
//            					
// .success(function() {
// $scope.getActivities();
// })
// .error(function() {
//					
// });
// console.log("deleting item " + item.name);
// }
// });
// };


	
	
	$scope.sort = function(keyName){
		$scope.sortKey = keyName;
		$scope.reverse = !$scope.reverse;
		
	};
	
	
// $scope.removeActivity = function(id) {
// var deleteActivity = $window.confirm('Are you absolutely sure you want to
// delete activity?');
// if (deleteActivity) {
// activityService.deleteActivity(id)
// .success(function() {
// $scope.getActivities();
// $scope.deleted = true;
// })
// .error(function() {
//		  					
// });
// };
//		    
// };
	
	 $scope.delete = function(id) {
	      $confirm({text: 'Are you sure you want to delete?', title: 'Delete it', ok: 'Yes', cancel: 'No'})
	        .then(function() {
	        	activityService.deleteActivity(id)
				.success(function(data) {
					$scope.deleteded=data;
					$scope.getActivities();
					$scope.deleted = true;
				})
				.error(function() {
					
				});
	        });
	    };
		  
		  
// $scope.alerts = [
// { type: 'danger', msg: 'Error deleting activity!' },
// { type: 'success', msg: 'Activity deleted!' }
// ];
//			  
// $scope.closeAlert = function(index) {
// $scope.alerts.splice(index, 1);
// };
			  
	    

})


// ///////////////////////////////////////////USER-CONTROLLER/////////////////////////////////////////////////////////////////////////////////////////////
wafepaApp.controller('UserController',function($scope,$http,userService,$location,$routeParams,$confirm){
	
	// ////////////////////////////////Adresa/////////////////////////////////////
	
	$scope.getAddress = function(id){
		$http.get('api/users/'+id+'/addresses')
		.success(function(data){
		
			$scope.addresses = data;
			
		})
		.error(function(){
			
		});
	}
	
	$scope.initAddress = function() {
		$http.get('api/users/'+$routeParams.id+'/addresses')
					.success(function(data) {
						$scope.adrese = data;
					})
					.error(function() {
						
					});
		}
	
	$scope.addAddress = function(){
		
		$http.post('api/users/'+$routeParams.id+'/addresses',$scope.address)
		.success(function(data){
			console.log(data);
			$scope.initAddress();
			})
		.error(function(){
			
		});
	}
	
	$scope.deleteAddress = function(id){
		$http.delete('/api/users/'+$routeParams.id+'/addresses/' + id)
		.success(function(data) {
			$scope.initAddress();
		})
		.error(function() {
			
		});
	}
	
	
	
	
	// ///////////////ALL USERS//////////////////////////
	
	$scope.getUsers = function() {
				userService.getUsers({'firstname': $scope.search, 'page': $scope.page})
				.success(function(data, status, headers) {
					$scope.users = data;
					$scope.totalPages = headers('total-pages');
					
				})
				.error(function() {
					$scope.error = true;
					
				});
	};
	
	
	$scope.checkNameAndLastName = function(name,lastname){
		userService.getUsers()
		.success(function(data) {
			var user = data;
			for(var i = 0; i < user.length;i++){
				if(user[i].firstname==name && user[i].lastname==lastname){
						console.log(user[i]);
						$scope.istina = true;
					}
			}if($scope.istina!=true){
				$scope.saveUser();
			}
			})
		.error(function(){
			
		});
	};		
	
	
	$scope.check = function(name){
		userService.getUsers()
		.success(function(data) {
			var user = data;
			for(var i = 0; i < user.length;i++){
				if(user[i].firstname==name){
					console.log(user[i].firstname);
					$scope.djani2= user[i].firstname;
					$scope.djani1= user[i].id;
					$scope.djani3= user[i].lastname;
					
				}
			}
			
			
			
		})
		.error(function() {
			$scope.error = true;
			
		});
	};
	
	
	
	// //////////////////DELETE///////////////////////
	 $scope.deleteUser = function(id) {
	      $confirm({text: 'Are you sure you want to delete?', title: 'Delete it', ok: 'Yes', cancel: 'No'})
	        .then(function() {
	        	userService.deleteUser(id)
				.success(function() {
					$scope.getUsers();
					$scope.deleted = true;
				})
				.error(function() {
					
				});
	        });
	    };
	
	// //////////////////ADD///////////////////////////////
	
	$scope.saveUser = function() {
		userService.saveUser($scope.user)
				.success(function() {
					$location.path('/users');
					$scope.add = true;
				})
				.error(function() {
					
				});
	};
	
	
	
})

wafepaApp.controller('BBCController', function($http,$scope){
  $scope.getList = function() {
    return $http({
      method: 'GET',
      url: 'http://www.bbc.co.uk/radio1/playlist.json',
      responseType: 'json'
    }).then(function (response){
      $scope.playlist = response.data.playlist;
    }, function (error) {
      console.log(error);
    });
  };
});

wafepaApp.controller('movieController', function($http,$scope){

    $scope.getMovie = function(title,year) {
      if (title) {
        return $http({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/search/movie',
          params: {
            query: title,
            api_key:'f6afb0b07792696a991bb208db88201b'
            // year: year -> mozda mogu da prosledim i ovaj parametar
             
          }
        }).then(function (response){
          $scope.movies=response.data.results;
        }, function (error) {
          console.log(error);
        });
      }

      if (year) {
        return $http({
          method: 'GET',
          url: 'https://api.themoviedb.org/3/discover/movie',
          params: {
            api_key:'f6afb0b07792696a991bb208db88201b',
            year: year
          }
        }).then(function (response){
        	$scope.movies = response.data.results
        }, function (error) {
          console.log(error);
        });
      }
    };

  });

wafepaApp.controller('vremeController', function($http,$scope){

    $scope.getPrognoza = function(grad) {
        return $http({
          method: 'GET',
          dataType:'json',
          
         url: 'http://api.openweathermap.org/data/2.5/weather?q='+grad+'&APPID=5232d866320a9954c013d0502bbcad14&units=metric',
         
        }).then(function (response){
        	$scope.vreme = response.data;
        	
        	console.log(response.data.weather[0].description);
        	
        }, function (error) {
          console.log(error);
        });
      }
    
});

// Belgrade ID 792680
// id=792680&APPID=5232d866320a9954c013d0502bbcad14&units=metric'



// wafepaApp.controller('BBCController',function($http,$scope,bbcService,$location){
// $scope.getList = function() {
// $http.jsonp('http://www.bbc.co.uk/radio1/playlist.json?callback=JSON_CALLBACK')
// .success(function(data) {
// $scope.list = data;
//            
//            
// })
// .error(function() {
// $scope.error = true;
//            
// });
// };

// //////////////////////////////////////////ADDRESS/////////////////////////////////////////
// wafepaApp.controller('AddressController', function($scope,$http ,$location,
// $routeParams, activityService,$window,$confirm) {
// $scope.getAddress = function(id){
// $http.get('api/users/'+id+'/addresses')
// .success(function(data) {
// $scope.address = data;
// })
// .error(function() {
// $scope.error = true;
//			
// });
// }
//	
//	
// })

wafepaApp.controller('DatepickerDemoCtrl', function ($scope) {
	  $scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();

	  $scope.clear = function() {
	    $scope.dt = null;
	  };

	  $scope.options = {
	    customClass: getDayClass,
	    minDate: new Date(),
	    showWeeks: true
	  };

	  // Disable weekend selection
	  function disabled(data) {
	    var date = data.date,
	      mode = data.mode;
	    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
	  }

	  $scope.toggleMin = function() {
	    $scope.options.minDate = $scope.options.minDate ? null : new Date();
	  };

	  $scope.toggleMin();

	  $scope.setDate = function(year, month, day) {
	    $scope.dt = new Date(year, month, day);
	  };

	  var tomorrow = new Date();
	  tomorrow.setDate(tomorrow.getDate() + 1);
	  var afterTomorrow = new Date(tomorrow);
	  afterTomorrow.setDate(tomorrow.getDate() + 1);
	  $scope.events = [
	    {
	      date: tomorrow,
	      status: 'full'
	    },
	    {
	      date: afterTomorrow,
	      status: 'partially'
	    }
	  ];

	  function getDayClass(data) {
	    var date = data.date,
	      mode = data.mode;
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

	      for (var i = 0; i < $scope.events.length; i++) {
	        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

	        if (dayToCheck === currentDay) {
	          return $scope.events[i].status;
	        }
	      }
	    }

	    return '';
	  }
	});

wafepaApp.controller('TypeaheadCtrl', function($scope, $http) {

	  var _selected;

	  $scope.selected = undefined;
	  $scope.states = ['Running','Swimming','Coding','Jogging','Basketball','Football','Eating'];
	 
	  $scope.getLocation = function(val) {
	    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
	      params: {
	        address: val,
	        sensor: false
	      }
	    }).then(function(response){
	      return response.data.results.map(function(item){
	        return item.formatted_address;
	      });
	    });
	  };

	  $scope.ngModelOptionsSelected = function(value) {
	    if (arguments.length) {
	      _selected = value;
	    } else {
	      return _selected;
	    }
	  };

	  $scope.modelOptions = {
	    debounce: {
	      default: 500,
	      blur: 250
	    },
	    getterSetter: true
	  };
})





wafepaApp.controller('sentMailCntrl',function($scope, $http){
  $scope.sendMail = function(email){
    
    var mailJSON ={
        "key": "Qg2Z3WEoEpXG3wG0",
        "message": {
          "html": "",
          "text": "http://localhost:8080/#/",
          "subject": "Posetite Aljosin sajt",
          "from_email": "aljosa7@yahoo.com",
          "from_name": "Aljosa Lukic",
          "to": [
            {
              "email": ""+email,
              "name": "John Doe",
              "type": "to"
            }
          ],
          "important": false,
          "track_opens": null,
          "track_clicks": null,
          "auto_text": null,
          "auto_html": null,
          "inline_css": null,
          "url_strip_qs": null,
          "preserve_recipients": null,
          "view_content_link": null,
          "tracking_domain": null,
          "signing_domain": null,
          "return_path_domain": null
        },
        "async": false,
        "ip_pool": "Main Pool"
    };
    var apiURL = "https://mandrillapp.com/api/1.0/messages/send.json";
    $http.post(apiURL, mailJSON).
      success(function(data, status, headers, config) {
        alert('successful email send.');
        $scope.form={};
        console.log('successful email send.');
        console.log('status: ' + status);
        console.log('data: ' + data);
        console.log('headers: ' + headers);
        console.log('config: ' + config);
      }).error(function(data, status, headers, config) {
        console.log('error sending email.');
        console.log('status: ' + status);
      });
  }
})

