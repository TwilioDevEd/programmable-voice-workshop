# Media Streams

This example application demonstrates the power of [Media Streams](https://twilio.com/media-streams) by forking audio from a call, transcribing it, and playing a text-to-speech version of the transcription back to the caller.

## Setup

Create a Google Application that has Google's [Speech to Text API](https://console.cloud.google.com/launcher/details/google/speech.googleapis.com) enabled.

Create credentials for a Service Account and save them as `google_creds.json` in the [folder](./) next to this README.md

Install and configure the server

```bash
npm install
npx configure
```

To run locally you'll need to open a port on your machine, so that Twilio can communicate. You can do this using [ngrok](https://ngrok.io).

```bash
ngrok http 3000
```

Wire up a number or make a call to execute the TwiML found in [twiml/stream.xml](../twiml/stream.xml) (Make sure to change to your `ngrok` URL!)
