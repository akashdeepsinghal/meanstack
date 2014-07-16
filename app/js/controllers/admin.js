'use strict';

angular.module('tripsApp')
.controller('AdminCtrl', function ($scope){	
	$scope.tagline = 'Happy to help you!';
})
.controller('AdminBlogCtrl',['$scope', 'customHttp', function ($scope, customHttp){	
	// $scope.content = 'Team Tripsphere';
	$scope.addBlog = function () {
		var nd = new Date();
		var y = nd.getFullYear();
		var m = nd.getMonth();
		var d = nd.getDate();
		var title = $scope.title;
		var author = $scope.author;
		var content = $scope.content;
		var publish = $scope.publish;
		var impParams = 'title='+title+'&author='+author+'&created_on='+nd+'&year='+y+'&month='+m+'&date='+d+"&content="+content+"&publish="+publish;
		customHttp.request(impParams,'/api/blogs/create','POST',function (data) {
			if(data.status){
				console.log(data);
				$scope.blog.push(data.data);
				// loadBlogs();
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