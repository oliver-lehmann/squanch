var player = videojs('bar-rma-video');

document.getElementById('commentary-1').addEventListener('click', function() {
  event.preventDefault();
  player.src({ type: 'audio/mp3', src: 'https://squanch-bucket.s3.eu-west-1.amazonaws.com/audios/example.mp3' });
  player.play();
});
/*
document.getElementById('commentary-2').addEventListener('click', function() {
  player.src({ type: 'audio/mp3', src: 'https://example.com/audio2.mp3' });
});

document.getElementById('commentary-3').addEventListener('click', function() {
  player.src({ type: 'audio/mp3', src: 'https://example.com/audio3.mp3' });
});*/


player.on('play', function() {
  console.log('the video is playing');
});

player.on('pause', function() {
  console.log('the video is paused');
});

// Add multiple audio tracks with the audioTracks API
/*
var track1 = new videojs.AudioTrack({
  id: 'track1',
  kind: 'alternative',
  label: 'Speaker 1',
  language: 'en'
});

var track2 = new videojs.AudioTrack({
  id: 'track2',
  kind: 'alternative',
  label: 'Speaker 2',
  language: 'en'
});

player.audioTracks().addTrack(track1);
player.audioTracks().addTrack(track2);

// to switch between audio tracks, we use the enabled property
track1.enabled = true; // enable track1
track2.enabled = false; // disable track2
*/
