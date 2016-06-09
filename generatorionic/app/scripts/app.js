'use strict';

/**
 * @ngdoc overview
 * @name generatorionicApp
 * @description
 * # generatorionicApp
 *
 * Main module of the application.
 */
angular
  .module('generatorionicApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
