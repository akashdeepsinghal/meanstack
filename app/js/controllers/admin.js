'use strict';

angular.module('tripsApp')
.controller('AdminCtrl', function ($scope){	
	$scope.tagline = 'Happy to help you!';
})
.controller('AdminBlogCtrl',['$scope', 'customHttp', 'ngDialog', function ($scope, customHttp, ngDialog){
	// $scope.content = 'Team Tripsphere';
	loadBlogs();
	function loadBlogs() {
		$scope.activeDeleteIndex;
		$scope.changePublish = false;
		console.log('being called');
		customHttp.request('','/api/blogs/getall','POST',function (data) {
			if(data.status){
				$scope.blogs = data.data;
			}
			else{
				$scope.error.push({
					type : 'fail',
					message: data.message
				})
			}
		})
	}
	$scope.addBlog = function () {
		loadBlogs();
		var nd = new Date();
		var y = nd.getFullYear();
		var m = nd.getMonth();
		var d = nd.getDate();
		var title = $scope.title;
		var author = $scope.author;
		var content = $scope.content;
		var publish = $scope.publish;
		var urlName = $scope.title.toLowerCase().split(' ').join('-');
		var impParams = 'title='+title+'&author='+author+'&created_on='+nd+'&year='+y+'&month='+m+'&date='+d+"&content="+content+"&publish="+publish+"&urlName="+urlName;
		customHttp.request(impParams,'/api/blogs/create','POST',function (data) {
			if(data.status){
				document.getElementById('newblogform').reset();
				console.log(data);
				$scope.blogs.push(data.data);
				loadBlogs();
			}
			else{
				$scope.error.push({
					type : 'fail',
					message: data.message
				})
			}
		})
	};

	$scope.changePublish =  function (blog) {
		// console.log(blog.publish);
		// $scope.changePublish = true;
	}

	$scope.savePublish =  function (blog) {
		console.log(blog.publish);
		// $scope.changePublish = false;
	}

	$scope.deleteBlog = function (index) {
		console.log('Alert!');
		$scope.activeDeleteIndex = index;
	}

	$scope.deleteABlog = function (index) {
		return  $scope.activeDeleteIndex === index;
		console.log($scope.activeDeleteIndex);
	}

	$scope.deleteYes = function (blog) {
		var blog_id = blog._id;
		console.log(blog_id);

		var impParams = 'blog_id='+blog_id;
		customHttp.request(impParams,'/api/blogs/remove','POST',function (data) {
			console.log(data);
			if(data.status){
				console.log("removed");
				$scope.activeDeleteIndex=-1;
				var index = -1, i=0;
				$scope.blogs.forEach(function(blog){
					if( blog._id == blog_id ){
					  index = i;
					}
					i++;
				});
				console.log(index);
				if( index >= 0 ){
					$scope.blogs.splice(index,1);
				}
			}
			else{
				console.log("Some error");
				$scope.error.push({
					type : 'fail',
					message: data.message
				})
			}
		})
	}

	$scope.deleteNo = function (blog) {
		$scope.activeDeleteIndex=-1;
	}
}])
.controller('AdminBlogEditCtrl',['$scope', '$location', 'customHttp', '$stateParams', 'ngDialog', function ($scope, $location, customHttp, $stateParams, ngDialog){
	blogEdit();
	function blogEdit () {
		var blog_id = $stateParams.id;
		console.log(blog_id);
		var impParams = 'blog_id='+blog_id;
		console.log(impParams);
		customHttp.request(impParams,'/api/blogs/getbyid','POST',function (data) {
			console.log(data.status);
			if(data.status){
				console.log('done');
				$scope.blog = data.data[0];
				console.log($scope.blog);
			}
			else{
				console.log("Some error");
				$scope.error.push({
					type : 'fail',
					message: data.message
				})
			}
		})
	}

	$scope.updateBlog = function () {
		var impParams = 'blog='+JSON.stringify($scope.blog);
		console.log(impParams);
		customHttp.request(impParams,'/api/blogs/update','POST',function (data) {
			if(data.status){
				console.log(data);
				$location.path("/admintrips/blogs");
			}
			else{
				$scope.error.push({
					type : 'fail',
					message: data.message
				})
			}
		})
	}

	$scope.discardChanges = function () {
		$location.path("/admintrips/blogs");
	}

}])



.controller('AdminPlanCtrl',['$scope', 'customHttp', 'ngDialog', function ($scope, customHttp, ngDialog){
	$scope.np ={};
    $scope.addons = [
        {name:'camping', selected: false},
        {name:'rappelling', selected: false},
        {name:'waterfall rappelling', selected: false},
        {name:'rock climbing', selected: false},
        {name:'river crossing', selected: false},
        {name:'beach side camping', selected: false},
        {name:'night trekking', selected: false},
        {name:'fishing', selected: false},
        {name:'kayaking', selected: false},
        {name:'private music performance', selected: false}
    ];
    $scope.difficulties = [
        {
            name:'Very Easy'
        },
        {
            name:'Easy'
        },
        {
            name:'Moderate'
        },
        {
            name:'Difficult'
        },
        {
            name:'Expert Level'
        }
    ];
    $scope.seasons_best = [
        {id : 'january', name:'January', selected: false},
        {id : 'february', name:'February', selected: false},
        {id : 'march', name:'March', selected: false},
        {id : 'april', name:'April', selected: false},
        {id : 'may', name:'May', selected: false},
        {id : 'june', name:'June', selected: false},
        {id : 'july', name:'July', selected: false},
        {id : 'august', name:'August', selected: false},
        {id : 'september', name:'September', selected: false},
        {id : 'october', name:'October', selected: false},
        {id : 'november', name:'November', selected: false},
        {id : 'december', name:'December', selected: false},
    ];
    $scope.seasons_worst = [
        {id : 'january', name:'January', selected: false},
        {id : 'february', name:'February', selected: false},
        {id : 'march', name:'March', selected: false},
        {id : 'april', name:'April', selected: false},
        {id : 'may', name:'May', selected: false},
        {id : 'june', name:'June', selected: false},
        {id : 'july', name:'July', selected: false},
        {id : 'august', name:'August', selected: false},
        {id : 'september', name:'September', selected: false},
        {id : 'october', name:'October', selected: false},
        {id : 'november', name:'November', selected: false},
        {id : 'december', name:'December', selected: false},
    ];
    $scope.addPlan = function () {
    	$scope.np.season = {};

    	$scope.np.season.best = [];
	    $scope.seasons_best.forEach(function (a) {
	    	if (a.selected) {
	    		$scope.np.season.best.push(a.name);
	    	}
	    });
	    $scope.np.season.worst = [];
	    $scope.seasons_worst.forEach(function (a) {
	    	if (a.selected) {
	    		$scope.np.season.worst.push(a.name);
	    	}
	    });

	    $scope.np.addons = [];
	    $scope.addons.forEach(function (a) {
	    	if (a.selected) {
	    		var b = {
	    			name : a.name,
	    			price : a.price
	    		}
	    		$scope.np.addons.push(b);
	    	}
	    });
		var np = $scope.np;
		np = JSON.stringify(np);
		console.log(np);
		var impParams = 'plan='+np;
		customHttp.request(impParams,'/api/plans/create','POST',function (data) {
			if(data.status){
				document.getElementById('newplanform').reset();
				console.log(data);
				$scope.plans.push(data.data);
				// loadPlans();
			}
			else{
				$scope.error.push({
					type : 'fail',
					message: data.message
				})
			}
		})
	};
    
}])