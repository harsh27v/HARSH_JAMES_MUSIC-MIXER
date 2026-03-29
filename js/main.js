console.log("JavaScript File is linked");

const targetZones = document.querySelectorAll(".target-zone");
const dragItems = document.querySelectorAll(".drag-item");
//const audioPlayer = document.querySelector('audio');
const playButton = document.querySelector('#play-all');
const pauseButton = document.querySelector('#pause-all');
const volSlider = document.querySelector('#volumeControl');
const stopButton = document.querySelector('#stop-all');
const resetButton = document.querySelector('#reset-all');
const dragCons = document.querySelectorAll("#drag-con>div");

let currentDraggedElement = null;

function dragStart() {
  currentDraggedElement = this;
}

console.log(currentDraggedElement);

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  this.appendChild(currentDraggedElement);

  console.log(currentDraggedElement.dataset.instrument);

  const instrument = document.createElement("audio");
  instrument.src = `audio/${currentDraggedElement.dataset.instrument}.mp3`;
  instrument.load();
  this.appendChild(instrument);
  instrument.loop;
  currentDraggedElement = null;
}

function playAudio() {
    const audioElements = document.querySelectorAll('audio');
    console.log(audioElements);
    audioElements.forEach(audioElement => {
      audioElement.play();
    })
}

function pauseAudio() {
    const audioElements = document.querySelectorAll('audio');
    console.log(audioElements);
    audioElements.forEach(audioElement => {
      audioElement.pause();
    })
}

function restartAudio() {
  const audioElements = document.querySelectorAll('audio');
  console.log(audioElements);
    audioElements.forEach(audioElement => {
      audioElement.currentTime = 0;
      audioElement.pause();
})
}

function setVolume() {
  const audioElements = document.querySelectorAll('audio');
  console.log(audioElements);
  audioElements.forEach(audioElement => {
    audioElement.volume = (this.value/100);
})
}

function resetMixer() {
 dragItems.forEach((dragItem, index) => {
      dragCons[index].appendChild(dragItem);
    });
};

dragItems.forEach(dragItem => {
  dragItem.addEventListener('dragstart', dragStart);
});

targetZones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', drop);
});

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
volSlider.addEventListener("input", setVolume);
stopButton.addEventListener("click", restartAudio);
resetButton.addEventListener('click', resetMixer);
