console.log("JavaScript File is linked");

const targetZones = document.querySelectorAll(".target-zone");
const dragItems = document.querySelectorAll(".drag-item");

const playButton = document.querySelector('#play-all');
const pauseButton = document.querySelector('#pause-all');
const stopButton = document.querySelector('#stop-all');
const resetButton = document.querySelector('#reset-all');
const volSlider = document.querySelector('#volumeControl');

const guitarAudio = document.querySelector("#guitar-audio");
const saxAudio = document.querySelector("#sax-audio");
const pianoAudio = document.querySelector("#piano-audio");
const drumsAudio = document.querySelector("#drums-audio");

let draggedItem = null;
let activeInstruments = [];

const originalParents = [];
dragItems.forEach((item, i) => {
  originalParents[i] = item.parentElement;
});

[guitarAudio, saxAudio, pianoAudio, drumsAudio].forEach(audio => {
  if (audio) audio.volume = 0.5;
});

dragItems.forEach(item => {
  item.addEventListener("dragstart", function () {
    draggedItem = this;
    console.log("Dragging", this.dataset.instrument);
  });
});

targetZones.forEach(zone => {

  zone.addEventListener("dragover", e => {
    e.preventDefault();
  });

  zone.addEventListener("drop", function (e) {
    e.preventDefault();

    if (!draggedItem) return;

    const zoneInstrument = this.dataset.instrument;
    const draggedInstrument = draggedItem.dataset.instrument;

    if (this.dataset.filled === "true") return;

    if (zoneInstrument !== draggedInstrument) {
      console.log("Wrong match");
      return;
    }

    this.appendChild(draggedItem);
    this.querySelector(".character-img").classList.remove("hidden");

    draggedItem.classList.add("hidden");

    this.dataset.filled = "true";

    if (!activeInstruments.includes(draggedInstrument)) {
      activeInstruments.push(draggedInstrument);
    }

    console.log("Placed", draggedInstrument);

    draggedItem = null;
  });
});

function playAudio() {
  console.log("Play clicked");

  activeInstruments.forEach(inst => {
    let audio;

    if (inst === "guitar") audio = guitarAudio;
    if (inst === "sax") audio = saxAudio;
    if (inst === "piano") audio = pianoAudio;
    if (inst === "drums") audio = drumsAudio;

    if (audio) {
      audio.currentTime = 0;

      let playPromise = audio.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log(inst, "playing");
          })
          .catch(err => {
            console.log(inst, "play error", err);
          });
      }
    }
  });
}

function pauseAudio() {
  console.log("Pause clicked");

  [guitarAudio, saxAudio, pianoAudio, drumsAudio].forEach(a => {
    if (a) a.pause();
  });
}

function stopAudio() {
  console.log("Stop clicked");

  [guitarAudio, saxAudio, pianoAudio, drumsAudio].forEach(a => {
    if (a) {
      a.pause();
      a.currentTime = 0;
    }
  });
}

function setVolume() {
  const v = this.value / 100;
  console.log("Volume:", v);

  [guitarAudio, saxAudio, pianoAudio, drumsAudio].forEach(a => {
    if (a) a.volume = v;
  });
}

function resetMixer() {
  console.log("Reset clicked");

  stopAudio();

  targetZones.forEach(zone => {
    zone.dataset.filled = "false";

    const img = zone.querySelector(".character-img");
    if (img) img.classList.add("hidden");
  });

  dragItems.forEach((item, i) => {
    originalParents[i].appendChild(item);
    item.classList.remove("hidden");
  });

  activeInstruments = [];
  draggedItem = null;
}

if (playButton) playButton.addEventListener("click", playAudio);
if (pauseButton) pauseButton.addEventListener("click", pauseAudio);
if (stopButton) stopButton.addEventListener("click", stopAudio);
if (resetButton) resetButton.addEventListener("click", resetMixer);
if (volSlider) volSlider.addEventListener("input", setVolume);
