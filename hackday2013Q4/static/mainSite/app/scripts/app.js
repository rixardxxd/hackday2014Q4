'use strict';

angular.module('hackday', ['ngRoute',"google-maps"])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'static/mainSite/app/views/company.html',
        controller: 'mapController'
      })
      .otherwise({
        redirectTo: '/'
       });
    });

/* TODO not sure if this is the correct place to add this code */
/*
$( document ).ready(function() {
    if('http://localhost:5000/#/company/1'==window.location.href){
	    $('body')[0].style.background="none";
    }
});
*/
