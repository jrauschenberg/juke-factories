'use strict';

juke.controller('PlayerCtrl', function ($scope, PlayerFactory) {

  $scope.currentSong = PlayerFactory.getCurrentSong;
  $scope.playing = PlayerFactory.isPlaying;

  $scope.toggle = function(song) {
    PlayerFactory.start(song);
  };
  $scope.next = function() {
    PlayerFactory.next();
  };
  $scope.prev = function() {
    PlayerFactory.previous();
  };
  $scope.progress = function() {
    return PlayerFactory.progress;
  };

});
