# Scripts

## Setup

```bash
npm install
npx configure-env
```

Note: `NODE_ENV` is set to `production` by default

## Usage

Run specific TwiML on a call from `$TWILIO_NUMBER` to `$TO` using files from the [TwiML](../twiml) folder.

In this example, the call executes [play.xml](../twiml/play.xml).

```bash
npm run make-call --file=play.xml
```
