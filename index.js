import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();


const __dirname = dirname(fileURLToPath(import.meta.url));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
res.sendFile(__dirname + "/public/register.html");
});

app.post("/send", (req, res) => {
  console.log(req.body);
  var name = req.body["name"];
  var number = req.body["number"];
  res.redirect("https://mkscode92.github.io/AiQworkflow1-/HLS.html");
  client.messages
  .create({
    body: `Hello, ${name}! Thank you for registering for AiC's HLS demo session. We look forward to seeing you.`,
    to: `+1${number}`, // Text your number
    from: '+18333686429', // From the valid Twilio number
  })
  .then((message) => console.log(message.sid));
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



