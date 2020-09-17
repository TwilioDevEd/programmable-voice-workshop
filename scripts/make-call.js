require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Client = require("twilio");

const client = new Client();

const twimlFile = process.env.npm_config_file;
if (!twimlFile) {
  console.warn("Usage: npm run make-call --file=say.xml");
  process.exit(0);
}

const twiml = fs.readFileSync(path.resolve('../twiml', twimlFile));

client.calls
  .create({
    to: process.env.TO,
    from: process.env.TWILIO_NUMBER,
    twiml,
  })
  .then((call) => {
    console.log(`Call created ${call.sid}`);
  })
  .catch((err) => {
    console.error(err);
  });
