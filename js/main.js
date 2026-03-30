console.log("JavaScript File is linked");

const targetZones = document.querySelectorAll(".target-zone");
const dragItems = document.querySelectorAll(".drag-item");
const playButton = document.querySelector('#play-all');
const pauseButton = document.querySelector('#pause-all');
const volSlider = document.querySelector('#volumeControl');
const stopButton = document.querySelector('#stop-all');
const resetButton = document.querySelector('#reset-all');
const dragCons = document.querySelectorAll("#drag-con>div");

const guitarAudio = document.querySelector("#guitar-audio");
const saxAudio = document.querySelector("#sax-audio");
const pianoAudio = document.querySelector("#piano-audio");
const drumsAudio = document.querySelector("#drums-audio");

let currentDraggedElement = null;
let activeInstruments = [];

targetZones.forEach(zone => {
  zone.dataset.filled = "false";
});

function dragStart() {
  currentDraggedElement = this;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();

  if (!currentDraggedElement) return;

  let zoneInstrument = this.dataset.instrument;
  let draggedInstrument = currentDraggedElement.dataset.instrument;
  let img = this.querySelector(".character-img");

  if (this.dataset.filled === "true") return;

  if (zoneInstrument !== draggedInstrument) {
    console.log("Wrong match");
    return;
  }

  this.appendChild(currentDraggedElement);
  img.classList.remove("hidden");

  currentDraggedElement.classList.add("hidden");

  this.dataset.filled = "true";

  if (!activeInstruments.includes(draggedInstrument)) {
    activeInstruments.push(draggedInstrument);
  }

  currentDraggedElement = null;
}

function playAudio() {
  activeInstruments.forEach(inst => {

    if (inst === "guitar") {
      guitarAudio.currentTime = 0;
      guitarAudio.play();
    }

    if (inst === "sax") {
      saxAudio.currentTime = 0;
      saxAudio.play();
    }

    if (inst === "piano") {
      pianoAudio.currentTime = 0;
      pianoAudio.play();
    }

    if (inst === "drums") {
      drumsAudio.currentTime = 0;
      drumsAudio.play();
    }

  });
}

function pauseAudio() {
  guitarAudio.pause();
  saxAudio.pause();
  pianoAudio.pause();
  drumsAudio.pause();
}

function restartAudio() {
  [guitarAudio, saxAudio, pianoAudio, drumsAudio].forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function setVolume() {
  let value = this.value / 100;

  [guitarAudio, saxAudio, pianoAudio, drumsAudio].forEach(audio => {
    audio.volume = value;
  });
}

function resetMixer() {

  restartAudio();

  targetZones.forEach(zone => {
    let img = zone.querySelector(".character-img");
    img.classList.add("hidden");
    zone.dataset.filled = "false";
  });

  dragItems.forEach((dragItem, index) => {
    dragCons[index].appendChild(dragItem);
    dragItem.classList.remove("hidden");
  });

  activeInstruments = [];
}

dragItems.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

targetZones.forEach(zone => {
  zone.addEventListener('dragover', dragOver);
  zone.addEventListener('drop', drop);
});

playButton.addEventListener("click", playAudio);
pauseButton.addEventListener("click", pauseAudio);
stopButton.addEventListener("click", restartAudio);
volSlider.addEventListener("input", setVolume);
resetButton.addEventListener("click", resetMixer);
