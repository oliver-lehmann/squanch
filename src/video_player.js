// Get the Component base class from Video.js
var Component = videojs.getComponent('Component');

// Create a new component for the audio menu
class AudioMenu extends Component {

  // The constructor of a component receives two arguments: the
  // player it will be associated with and an object of options.
  constructor(player, options={}) {
    super(player, options);
    this.addClass('vjs-audio-menu');
  }

  handleClick() {
    // Handle the addition of the second audio track here
    // You can use player.src() to add a new audio track
    console.log("Audio button was clicked.")
  }

  createEl() {
    var el = videojs.dom.createEl('button', {
      innerHTML: 'Add 2nd Audio',
      className: 'vjs-menu-button vjs-menu-button-popup vjs-control vjs-button'
    });

    el.addEventListener('click', () => this.handleClick());

    return el;
  }
}

// Register the new component
videojs.registerComponent('AudioMenu', AudioMenu);

// Create the player
var player = videojs('bar-rma-video');

// Add the new component to the control bar
player.getChild('controlBar').addChild('AudioMenu', {});


// Log some information to console to see if the player is working
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
