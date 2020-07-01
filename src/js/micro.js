
/* eslint-disable new-cap */
export default class Micro {
  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.input = document.querySelector('.search-input');
    this.microPhone = document.querySelector('.search-micro');
  }

  onRec() {
    this.recognition.start();
    this.recognition.addEventListener('result', (e) => this.setTextToInput(e));
  }

  setTextToInput(e) {
    const transcript = Array.from(e.results)
      .map((res) => res[0])
      .map(((res) => res.transcript))
      .join('');
    this.input.value = transcript;
  }

  addMicro() {
    this.microPhone.addEventListener('click', () => {
      this.onRec();
    });
  }
}
