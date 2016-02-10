'use strict';

juke.factory('PlayerFactory', function($http, $log, $rootScope, StatsFactory){
  // non-UI logic in here
  var obj = {};
  var currentSong = null;
  var playing = false;
  var audio = document.createElement('audio');
  var masterAlbum;
  var fullDuration;

  obj.load = function() {
    return $http.get('/api/albums/')
    .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
    .then(res => res.data)
    .then(album => {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song._id + '.audio';
        song.albumIndex = i;
      });
      masterAlbum = angular.copy(album);
      return album;
    })
    .catch($log.error);
  };

  audio.ontimeupdate = function () {
    $rootScope.$digest();
    obj.progress = 100 * audio.currentTime / audio.duration;
  };

      // StatsFactory.totalTime(album)
      // .then(function(albumDuration) {
      //   fullDuration = albumDuration;
      // });

  obj.start = function (song){
    // stop existing audio (e.g. other song) in any case
    var self = this;
    if (playing && song === currentSong) {
      self.pause();
    } else {
      self.pause();
      // resume current song
      if (song === currentSong) audio.play();
      // enable loading new song
      currentSong = song;
      audio.src = song.audioUrl;
      audio.load();
      audio.play();
      playing = true;
    }
  };

  obj.pause = function () {
    audio.pause();
    playing = false;
  };

  obj.resume = function () {
    this.start(currentSong);
  }; 

  obj.isPlaying = function() {
    return playing;
  };

  obj.getCurrentSong = function() {
    return currentSong;
  };

  obj.next = function () { 
    skip(1); 
    // $rootScope.$broadcast('next'); 
  };

  obj.previous = function () { 
    skip(-1); 
    // $rootScope.$broadcast('prev'); 
  };

  obj.progress = function() {
    return audio.currentTime / audio.duration;
  };

  var skip = function(interval) {
    function mod (num, m) { return ((num % m) + m) % m; };
    if (!currentSong) return;
    var index = currentSong.albumIndex;
    index = mod( (index + (interval || 1)), masterAlbum.songs.length );
    if (playing) obj.start(masterAlbum.songs[index]);
  };

  return obj;

});
