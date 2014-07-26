'use strict';

angular.module('tripsApp', ['ngRoute','ui.router', 'ngDialog'])

.config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider',function ($routeProvider,$stateProvider,$urlRouterProvider,$locationProvider) {

	$urlRouterProvider.when('/login/','/login');
	$urlRouterProvider.when('/signup/','/signup');
	// $urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);

	$stateProvider

//Home
		.state('home', {
			url: '/',
			templateUrl: '/views/home/index.html',
			controller: 'MainCtrl'
		})

//Blog
		.state('blog', {
			url: '/blog',
			templateUrl: '/views/blog/index.html',
			controller: 'BlogMainCtrl'
		})
		.state('blog-article', {
			url: '/blog/:year/:month/:date/:urlName',
			// parent: 'home',
			templateUrl: '/views/blog/article.html',
			controller: 'BlogArticleCtrl'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: '/views/contact/index.html',
			controller: 'ContactCtrl'
		})

//Admin
		.state('admin', {
			// parent: 'home',
			url: '/admintrips',
			templateUrl: '/views/admin/index.html',
			controller: 'AdminCtrl'
		})
		.state('admin-blogs', {
			// parent: 'admin',
			url: '/admintrips/blogs',
			templateUrl: '/views/admin/blogs.html',
			controller: 'AdminBlogCtrl'
		})
		.state('admin-blog-edit', {
			// parent: 'admin',
			url: '/admintrips/blogs/edit/:id',
			templateUrl: '/views/admin/blog-edit.html',
			controller: 'AdminBlogEditCtrl'
		})

//sessions
		.state('signup', {
			url: '/signup',
			templateUrl: '/views/session/signup.html',
			controller: 'SignupCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/views/session/login.html',
			controller: 'LoginCtrl'
		})
}]);