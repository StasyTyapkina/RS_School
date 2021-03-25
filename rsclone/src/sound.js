const buttonSound = document.querySelector('.sound_bttn');
const musicControl = document.querySelector('.music_control_slider');
const musicValue = document.querySelector('.music_value');
const soundsControl = document.querySelector('.sound_control_slider');
const soundsValue = document.querySelector('.sounds_value');

buttonSound.sound = false;
buttonSound.classList.add('sound_bttn--activatable');
buttonSound.classList.toggle('sound_bttn--active', buttonSound.sound);

const audioMusic = document.createElement('audio');
audioMusic.id = 'audio_music';
audioMusic.src = './src/sounds/main.mp3';
audioMusic.loop = true;
audioMusic.volume = 0.4;
document.body.appendChild(audioMusic);

const audioSound = document.createElement('audio');
audioSound.id = 'audio_sound';
audioSound.src = './src/sounds/tink.mp3';
audioSound.volume = 0.4;
document.body.appendChild(audioSound);

function toggleSound() {
  buttonSound.sound = !buttonSound.sound;
}

buttonSound.addEventListener('click', () => {
  toggleSound();
  buttonSound.classList.toggle('sound_bttn--active', buttonSound.sound);

  if (buttonSound.sound) {
    audioMusic.play();
    audioSound.play();
    buttonSound.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    audioMusic.pause();
    buttonSound.innerHTML = '<i class="fas fa-volume-off">';
  }
});

document.addEventListener('click', () => {
  if (buttonSound.sound) {
    audioSound.play();
  }
});

document.addEventListener('input', () => {
  audioMusic.volume = musicControl.value;
  musicValue.innerHTML = `${Math.round(audioMusic.volume * 100)}  %`;

  audioSound.volume = soundsControl.value;
  soundsValue.innerHTML = `${Math.round(audioSound.volume * 100)}  %`;
});
