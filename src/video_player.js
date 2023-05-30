// Get the Component base class from Video.js
var Component = videojs.getComponent('Component');

var speaker_menu = document.getElementById("speaker-menu");

// Create a new component for the audio menu
class AudioMenu extends Component {

  // The constructor of a component receives two arguments: the
  // player it will be associated with and an object of options.
  constructor(player, options={}) {
    super(player, options);
    this.addClass('vjs-audio-menu');
    this.menuOpen = false;
  }

  handleClick() {
    // Handle the addition of the second audio track here
    // You can use player.src() to add a new audio track
    console.log("Audio button was clicked.")
    speaker_menu.style.display = "block";
    this.menuOpen = !this.menuOpen;
    this.updateMenu();
  }

  // This method creates the DOM element that will contain the component.
  createEl() {
    // menu button
    var el = videojs.dom.createEl('button', {
      className: 'vjs-menu-button vjs-menu-button-popup vjs-control vjs-button'
    });

    // image of menu button
    var icon = videojs.dom.createEl('i', {
      className: 'fa-solid fa-comment-dots fa-flip-horizontal',
      style: 'color: #7cf895;'
    });
    el.appendChild(icon);

    // menu
    this.menu = videojs.dom.createEl('div', {
      className: 'vjs-menu',
      style: 'display: none;'
    });

    // menu content
    this.button1 = videojs.dom.createEl('button', {
      innerHTML: 'Speaker 1',
      className: 'vjs-menu-item',
      onclick: () => this.setAudio('https://squanch-bucket.s3.eu-west-1.amazonaws.com/audios/example.mp3')
    });

    this.button2 = videojs.dom.createEl('button', {
      innerHTML: 'Speaker 2',
      className: 'vjs-menu-item',
      onclick: () => this.setAudio('https://squanch-bucket.s3.eu-west-1.amazonaws.com/audios/example-2.wav')
    });

    this.menu.appendChild(this.button1);
    this.menu.appendChild(this.button2);
    el.appendChild(this.menu);
    el.addEventListener('click', () => this.handleClick());

    return el;
  }

  updateMenu() {
    this.menu.style.display = this.menuOpen ? 'block' : 'none';
  }

  setAudio(audioFile) {
    var currentTime = this.player_.currentTime();
    this.player_.src([
      { type: "video/mp4", src: "https://squanch-bucket.s3.eu-west-1.amazonaws.com/Barcelona-RealMadrid.mp4" },
      { type: "audio/mp3", src: audioFile}
    ]);
    this.player_.currentTime(currentTime);
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
