'use strict';

angular.module('tripsApp')
.controller('BlogMainCtrl', function ($scope){	
	$scope.tagline = 'It starts with a story!';

	$scope.articles = [
	{'name':'this is heading', 'author':'Akash', 'longDate':'July 15, 2014', 'date':'15', 'month': '07', 'year':'2014' , 'urlName':'this-is-heading', 'short':"Web design in complicated and requires a lot of time and knowledge — and patience. It's no longer just embedded text background images and slices; it's"},
	{'name':'this is heading', 'author':'Mukesh', 'longDate':'July 16, 2014', 'date':'16', 'month': '07', 'year':'2014' , 'urlName':'this-is-heading', 'short':"2011 has been an exciting year for Codrops and we want to thank you for supporting us! We've learned a lot and it's a privilege to us to be able to"}
	];
})

.controller('BlogArticleCtrl',['$scope', '$stateParams',
 function ($scope, $stateParams){
	getTheArticle();

	function getTheArticle () {
		$scope.year = $stateParams.year;
		$scope.month = $stateParams.month;
		$scope.date = $stateParams.date;
		$scope.articleUrlName = $stateParams.articleUrlName;
		console.log($scope.articleUrlName);
	}
}]);