'use strict';

angular.module('tripsApp')
.controller('AdminCtrl', function ($scope){	
	$scope.tagline = 'Happy to help you!';
})
.controller('AdminBlogCtrl',['$scope', 'customHttp', function ($scope, customHttp){
	// $scope.content = 'Team Tripsphere';
	loadBlogs();
	function loadBlogs() {
		customHttp.request('','/api/blogs/getall','POST',function (data) {
			console.log(data.status);
			if(data.status){
				console.log(data);
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
	}
}])