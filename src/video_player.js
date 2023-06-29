function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}


// Function to sync audio with video
function syncAudio(audio) {
  if (player.paused()) {  
    audio.pause();
  } else {
    if (audio.paused) {
      audio.play();
    }
    audio.currentTime = player.currentTime();
  }
}

// Function to start syncing audio with video
function startSyncingAudio() {
  syncInterval = setInterval(function() {
    let selectedSpeaker = document.querySelector('.speaker-item.active');
    let active_speaker;
    if (selectedSpeaker) {
      if (selectedSpeaker.id === 'speaker-1') {
        active_speaker = speaker1;
      } else if (selectedSpeaker.id === 'speaker-2') {
        active_speaker = speaker2;
      }

      const audio_video_diff_threshold = 0.5;
      if (active_speaker.currentTime < player.currentTime() - audio_video_diff_threshold || active_speaker.currentTime > player.currentTime() + audio_video_diff_threshold) {
        console.log('active speaker time: ', active_speaker.currentTime, 'video time: ', player.currentTime());
        syncAudio(active_speaker);
      }
    }
  }, 1000); // 2000 milliseconds = 2 seconds
}

// Function to stop syncing audio with video
function stopSyncingAudio() {
  clearInterval(syncInterval);
}

function startPlayingAudio(iosDevice) {
  console.log("startPlayingAudio");
  let selectedSpeaker = document.querySelector('.speaker-item.active');
  if (selectedSpeaker) {
    if (selectedSpeaker.id === 'speaker-1') {
      syncAudio(speaker1);
    } else if (selectedSpeaker.id === 'speaker-2') {
      syncAudio(speaker2);
    } 
  } else if (!iosDevice) {
    // Play the audio of speaker 1 by default if the device is not iOS
    speaker1 = audio1;
    syncAudio(speaker1);
    let default_speaker = document.getElementById('speaker-1');
    default_speaker.classList.add('active');
    console.log('default commentary playing.');
    
    // Change the dropdown toggle text to the selected speaker
    dropdownToggleText.innerHTML = default_speaker.innerHTML + ' talking';
  }
  else {
    console.log('iOS device detected. no default commentary playing.')
  }

  // Start syncing audio with video every 2 seconds
  startSyncingAudio();
}


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
let player = videojs('bar-rma-video', options);$

// Declare the speaker variables as undefined. We will assign them later
let speaker1, speaker2;
let audio1 = new Audio('https://squanch-bucket.s3.eu-west-1.amazonaws.com/audios/Fabi-1.m4a');
let audio2 = new Audio('https://squanch-bucket.s3.eu-west-1.amazonaws.com/audios/Sven-2.m4a');

// Get the dropdown toggle
let dropdownToggleText = document.getElementById('dropdown-toggle-text');

// Event listeners for the dropdown menu
let menuItems = document.querySelectorAll('.speaker-item');

menuItems.forEach(function(item) {
  item.addEventListener('click', function(e) {
    e.preventDefault();

    if (this.id === 'speaker-1') {
      audio = audio1;
    } else if (this.id === 'speaker-2') {
      audio = audio2;
    }

    // Check if the clicked menu item is already active
    if (this.classList.contains('active')) {
      // If it is, remove the .active class and stop the audio
      this.classList.remove('active');
      audio.pause();

      // Change the dropdown toggle text to 'Choose Commentary'
      dropdownToggleText.innerHTML = 'Choose Commentary';
    } else {
      // Remove .active class from all menu items
      menuItems.forEach(function(otherItem) {
        otherItem.classList.remove('active');
        if (otherItem.id === 'speaker-1' && speaker1) {
          speaker1.pause();
        } else if (otherItem.id === 'speaker-2' && speaker2) {
          speaker2.pause();
        }
      });

      // Add .active class to the selected menu item
      this.classList.add('active');
      
      // Add .active class to the clicked menu item and sync with video
      if (this.id === 'speaker-1') {
        speaker1 = audio;
        syncAudio(speaker1);
      } else if (this.id === 'speaker-2') {
        speaker2 = audio;
        syncAudio(speaker2);
      }

      // Change the dropdown toggle text to the selected speaker
      dropdownToggleText.innerHTML = this.innerHTML + ' talking';
    }
  });
});

// Event listener for video play, ...
if (isIOS()){
  console.log('iOS detected');
  player.on('play', function() {
    console.log('play button clicked');
    startPlayingAudio(iosDevice=true);
  });
}
else {
  player.on('playing', function() {
    console.log('the video is playing');
    startPlayingAudio(iosDevice=false);
  });
}

// ... pause and buffering.
player.on(['pause', 'waiting'], function() {
  console.log('the video is paused/buffering.');
  if (speaker1) speaker1.pause();
  if (speaker2) speaker2.pause();

  // Stop syncing audio with video
  stopSyncingAudio();
});
