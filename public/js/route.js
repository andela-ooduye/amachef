var app = angular.module('amachef', ['ui.router', 'ngStorage'])

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $urlRouterProvider.when('/home', '/home/allrecipes');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'partials/partial-home.html',
        controller: 'MainController'
      })

    .state('home.search', {
      url: '/search',
      templateUrl: 'partials/partial-home-search.html',
      controller: 'MainController'
    })

    .state('home.allrecipes', {
      url: '/allrecipes',
      templateUrl: 'partials/partial-home-recipes.html',
      controller: 'MainController'
    })

    .state('signup', {
        url: '/signup',
        templateUrl: 'partials/partial-signup.html',
        controller: 'signupCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'partials/partial-login.html',
        controller: 'loginCtrl'
      })
      .state('addrecipe', {
        url: '/addrecipe',
        templateUrl: 'partials/partial-addrecipe.html',
        controller: 'addRecipeCtrl'
      })
  })
  .run(['$rootScope', 'info', '$state', '$location', function($rootScope, info, $state, $location) {
    $rootScope.$on('$stateChangeStart',
      function(event, toState) {
        if (info.getUser()) {
          if (toState.templateUrl == 'partials/partial-login.html' || toState.templateUrl == 'partials/partial-signup.html') {
            // window.location = '/';
            $location.path('/')
          }
        }
        else if (toState.templateUrl == 'partials/partial-home.html') {

        } else if (toState.templateUrl == 'partials/partial-login.html' || toState.templateUrl == 'partials/partial-signup.html') {
          
        } else {
          $state.go('login');
        }
      })
  }]);
