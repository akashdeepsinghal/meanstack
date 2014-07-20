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
				// $scope.error.push({
				// 	type : 'fail',
				// 	message: data.message
				// })
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