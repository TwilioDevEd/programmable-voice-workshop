const EventEmitter = require("events");
const Speech = require("@google-cloud/speech");
const speech = new Speech.SpeechClient();

const request = {
  config: {
    encoding: "MULAW",
    sampleRateHertz: 8000,
    languageCode: "en-US",
  },
  interimResults: true,
};

class TranscriptionService extends EventEmitter {
  constructor() {
    super();
    this.stream = null;
    this.streamCreatedAt = null;
  }

  send(payload) {
    this.getStream().write(payload);
  }

  close() {
    if (this.stream) {
      this.stream.destroy();
    }
  }

  // TODO: Use a timeout
  newStreamRequired() {
    if (!this.stream) {
      return true;
    } else {
      const now = new Date();
      const timeSinceStreamCreated = now - this.streamCreatedAt;
      return timeSinceStreamCreated / 1000 > 60;
    }
  }

  getStream() {
    if (this.newStreamRequired()) {
      if (this.stream) {
        this.stream.destroy();
      }
      this.streamCreatedAt = new Date();
      this.stream = speech
        .streamingRecognize(request)
        .on("error", console.error)
        .on("data", (data) => {
          const result = data.results[0];
          if (result === undefined || result.alternatives[0] === undefined) {
            return;
          }
          if (result.isFinal === true) {
            this.emit("transcription", result.alternatives[0].transcript);
          } else {
            console.log(`Partial result: ${result.alternatives[0].transcript}`);
          }
        });
    }

    return this.stream;
  }
}

module.exports = TranscriptionService;
