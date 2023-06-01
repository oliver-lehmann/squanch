// Define options for the Video.js player
const options = {
  language: "en",
  preload: "auto",
  fluid: true,
  controlBar: {
    pictureInPictureToggle: false,
    fullscreenToggle: false
  }
};

// Create the player
let player = videojs('bar-rma-video', options);

// Create the audio elements
let audio1 = new Audio('https://squanch-bucket.s3.eu-west-1.amazonaws.com/audios/Fabi-1.m4a')
let audio2 = new Audio('https://squanch-bucket.s3.eu-west-1.amazonaws.com/audios/example-2.wav')

// Function to sync audio with video
function syncAudio(audio) {
  if (player.paused()) {  
    audio.pause();
  } else {
    audio.play();
    audio.currentTime = player.currentTime();
  }
}

// Event listeners for the dropdown menu
let menuItems = document.querySelectorAll('.speaker-item');

menuItems.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();

    // Check if the clicked menu item is already active
    if (this.classList.contains('active')) {
      // If it is, remove the .active class and stop the audio
      this.classList.remove('active');
      if (this.id === 'speaker-1') {
        audio1.pause();
      } else if (this.id === 'speaker-2') {
        audio2.pause();
      }
    } else {
      // Remove .active class from all menu items
      menuItems.forEach(function(otherItem) {
        otherItem.classList.remove('active');
      });

      // Add .active class to the selected menu item
      this.classList.add('active');

      // Pause all audios first
      audio1.pause();
      audio2.pause();
    }

    // Play the selected audio and sync with video
    if (this.id === 'speaker-1') {
      syncAudio(audio1);
    } else if (this.id === 'speaker-2') {
      syncAudio(audio2);
    }
  });
});

// Event listener for video play and pause
player.on('play', function() {
  console.log('the video is playing');
  let selectedSpeaker = document.querySelector('.speaker-item.active').id;
  if (selectedSpeaker === 'speaker-1') {
    syncAudio(audio1);
  } else if (selectedSpeaker === 'speaker-2') {
    syncAudio(audio2);
  }
});

player.on('pause', function() {
  console.log('the video is paused');
  audio1.pause();
  audio2.pause();
});
