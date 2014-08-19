var app = angular.module('NewApp', ['ngRoute', 'NewApp.IndexCtrl'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
          templateUrl: 'app/views/index.html',
          controller: 'IndexCtrl'
        }
      );
    }]);

app.run(function($rootScope) {
  $rootScope.safeApply = function(fn) {
      var phase = this.$root.$$phase;
      if(phase === '$apply' || phase === '$digest') {
          if(fn && (typeof(fn) === 'function')) {
              fn();
          }
      } else {
          this.$apply(fn);
      }
  };
  $rootScope.error = {
    error: false,
    message: ''
  };
  $rootScope.handleError = function(message) {
    $rootScope.error.error = true;
    $rootScope.error.message = message;
  };
  $rootScope.dismissError = function() {
    $rootScope.error.error = false;
    $rootScope.error.message = '';
  };
});