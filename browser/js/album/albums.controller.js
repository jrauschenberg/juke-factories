juke.controller('AlbumsCtrl', function($scope, $rootScope, $log, PlayerFactory, StatsFactory) {

  // load our initial data
PlayerFactory.loadAll()
  .then(function(albums) {
    $scope.albums= albums;
    console.log($scope.albums);
  });





 });
