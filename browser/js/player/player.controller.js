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
    // $scope.$digest(); // no Angular-aware code is doing this for us here
    return PlayerFactory.progress;
  };
  

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  // var audio = document.createElement('audio');
  // audio.addEventListener('ended', $scope.next);

  // audio.addEventListener('timeupdate', function () {
  //   $scope.progress = 100 * audio.currentTime / audio.duration;
  //   $scope.$digest(); // no Angular-aware code is doing this for us here
  // });

  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // outgoing events (to Album… or potentially other characters)

});
