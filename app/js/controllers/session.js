'use strict';

angular.module('tripsApp')

// LOGIN CONTROLLER
.controller('LoginCtrl', function ($scope){	
	$scope.tagline = 'Happy to help you!';
})

// SIGNUP CONTROLLER
.controller('SignupCtrl', ['$scope', 'customHttp', function ($scope, customHttp){
	$scope.error = "";
	$scope.Signup = function(){
		if($scope.signup.$valid){
			var name = $scope.name;
			var email = $scope.email;
			var password = $scope.password;
			console.log(name,email,password);
			var send_data = 'name='+name+'&email='+email+'&password='+password;
			customHttp.request(send_data,'/api/users/add','POST',function(data){
 				if(data.status){
 					document.getElementById("signup").reset();
 					alert('account created successfully, you can now login');
 				}
 				else{
 					alert(data.message);
 					$scope.error = data.message
 				}
 			})
		}
		else{
			console.log('error',$scope.signup.$error);
		}
	};
}])

.controller('LoginCtrl', ['$scope', 'customHttp', '$window', function ($scope, customHttp, $window) {
  	$scope.error = [];

    $scope.Login = function(){
    	var email = $scope.email;
    	var password = $scope.password;
    	// var email = angular.element('#loginuser')[0].value;
    	// var password = angular.element('#loginpswd')[0].value;
    	function validate(email, password){
    		var pattern=/^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
    		if(pattern.test(email)){
				if(password) { return true; }
				else {$scope.err = {type : 'fail',message : 'Invalid Password'}; return false;}
    		}else{   
				$scope.err = {type : 'fail',message : 'invalid email'}	
				return false;
    		}
    	}

		if(validate(email, password)){
			console.log(validate(email, password));
			var send_data = 'email='+email+'&password='+password;
			console.log(send_data);
			customHttp.request(send_data,'/api/users/login','POST',function(data){			
				if(data.status){
					$window.localStorage.setItem('log', password);
					$window.localStorage.setItem('session', data.data._id);
					$window.localStorage.setItem('csrf', data.data.csrf);
					$window.location.href = '/';
				}
				else{
					//TODO show the error gracefully;
					$scope.error.push({
						type : 'fail',
						message : data.message
					});
					//alert('login failed');
				}
			})			
		}
		else{
			$scope.error.push($scope.err);
		}	
    }

	$scope.hideAlert = function(){
      $scope.error = [];
    };
}]);