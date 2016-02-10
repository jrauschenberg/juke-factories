'use strict';

juke.controller('AlbumCtrl', function($scope, $rootScope, $log, PlayerFactory, StatsFactory) {

  // load our initial data
  PlayerFactory.load()
  .then(function(album) {
    $scope.album = album;
  });

  // main toggle
  $scope.toggle = function (song) {
    if (song === $scope.currentSong && !$scope.playing) {
      PlayerFactory.resume(song);
    }
    else {
      PlayerFactory.start(song);
    }
  };

  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;


});
