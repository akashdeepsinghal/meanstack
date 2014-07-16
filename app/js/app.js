'use strict';

angular.module('tripsApp', ['ngRoute','ui.router'])

.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',function ($routeProvider,$stateProvider,$urlRouterProvider,$locationProvider) {

	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);

	$stateProvider

		.state('home', {
			url: '/',
			templateUrl: 'views/home/index.html',
			controller: 'MainCtrl'
		})

		.state('blog', {
			url: '/blog',
			templateUrl: 'views/blog/index.html',
			controller: 'BlogMainCtrl'
		})

		.state('blog-article', {
			url: '/blog/:year/:month/:date/:urlName',
			// parent: 'home',
			templateUrl: 'views/blog/article.html',
			controller: 'BlogArticleCtrl'
		})

		.state('contact', {
			url: '/contact',
			templateUrl: 'views/contact/index.html',
			controller: 'ContactCtrl'
		})

		.state('admin', {
			url: '/admintrips',
			templateUrl: 'views/admin/index.html',
			controller: 'AdminCtrl'
		})

		.state('admin-blogs', {
			// parent: 'admin',
			url: '/admintrips/blogs',
			templateUrl: 'views/admin/blogs.html',
			controller: 'AdminBlogCtrl'
		})
}]);