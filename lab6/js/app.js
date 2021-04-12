var myApp = angular.module("myApp", ["ngRoute"]);



myApp.config(function($routeProvider) {
    $routeProvider


        .when("/", { templateUrl: 'bai1.html', controller: 'bai1Controller' })


})