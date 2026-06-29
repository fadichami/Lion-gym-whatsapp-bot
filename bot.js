const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require("express");

const app = express();
app.use(express.json());

const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: "./.wwebjs_auth"   // folder where session is saved
    })
});


console.log("Starting WhatsApp client...");

client.on("loading_screen", (percent, message) => {
    console.log("Loading:", percent, message);
});

client.on("qr", (qr) => {
    console.log("QR RECEIVED");
    qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
    console.log("Authenticated!");
});

client.on("ready", () => {
    console.log("✅ WhatsApp Bot is ready!");
});

client.on("auth_failure", (msg) => {
    console.log("Authentication failed:", msg);
});

client.on("disconnected", (reason) => {
    console.log("Disconnected:", reason);
});

client.initialize();

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});