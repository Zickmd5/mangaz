
var app = angular.module('test', []);

app.factory('socket', function ($rootScope) {
  var socket = io('http://localhost:8080');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

app.controller('main', ['$scope','$http','socket', function($scope, $http, socket) {
  /*$scope.enviar = function(valor){
     socket.emit('new', valor);
     angular.element(document.querySelector('#element')).css({'color':'red'});
  }
  socket.on('view', function(data){
  angular.element(document.querySelector('#element')).append(data+"<br/>");
  });*/

  $scope.click = function(val){
    $http.post('/login', {usuario: val}).success(function(data){
      if(data.status == 200){
        window.location = "/";
      }
    });
  }

}]);