// Get properties from .env file and add to the envirnment
require("dotenv").config();

// Intantiate a discord.Client
const { Client, Collection } = require("discord.js");
const client = new Client({
	disableEveryone: true
});

// Load the command and events
["commands", "aliases"].forEach(x => (client[x] = new Collection()));
["command", "event"].forEach(x => require(`./handlers/${x}`)(client));

// Login the client
client.login(process.env.TOKEN);

const FNBRCO = require("fnbrco.js");
const fnbr = new FNBRCO(process.env.FNBR);
client.on("message", async message => {
      let items = "Renegade Raider"
      //message.channel.send(`Getting: |${item}|`)
      //fnbr.getImages(items).then(console.log)
      let item = await fnbr.getImages("Renegade Raider")
      let itmId = item.id
      let itmType = item.type
      let link = `https://image.fnbr.co/${itmType}/${itmId}/icon.png`
      console.log(link)
})