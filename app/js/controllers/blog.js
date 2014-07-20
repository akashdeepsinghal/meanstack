'use strict';

angular.module('tripsApp')
.controller('BlogMainCtrl',['$scope', 'customHttp', function ($scope, customHttp){
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
}])

.controller('BlogArticleCtrl',['$scope', 'customHttp', '$stateParams', function ($scope, customHttp, $stateParams){
	getTheArticle();

	function getTheArticle () {
		var y = $stateParams.year;
		var m = $stateParams.month;
		var d = $stateParams.date;
		var urlName = $stateParams.urlName;
		console.log(urlName);
		var impParams = 'urlName='+urlName+'&year='+y+'&month='+m+'&date='+d;
		customHttp.request(impParams,'/api/blogs/display','POST',function (data) {
			if(data.status){
				$scope.article = data.data[0];
			}
			else{
				// $scope.error.push({
				// 	type : 'fail',
				// 	message: data.message
				// })
			}
		})
	}
}])