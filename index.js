//Basic discord requirements
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const cmd = require("discord.js-commando")
const { config } = require("dotenv");
 const client = new Client({
    disableEveryone: true
}); 
const log = console.log;
const concol = require('chalk');//This is for coloring console messages.
// Collections
client.commands = new Collection();
client.aliases = new Collection();
config({
    path: __dirname + "/.env"
});
// Run the command loader
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});
//Bot Ready Code
client.on("ready", () => {
    console.log(`Hi, ${client.user.username} is now online!`);
    const botPing = `<@!${client.user.id}> `
    console.log('Prefix is ' + process.env.PREFIX);
    console.log('AtPrefix is ' + botPing);
    console.log('Ready For Use');

    client.user.setPresence({
        status: "online",
        game: {
            name: "Custom Bot for Valcore7!!!",
            type: ""
        }
    }); 
})
//========================================
//Regular Prefix Command
client.on("message", async message => {
    //===================
    const prefix = (process.env.PREFIX || botPing);
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});
//Bot ID As Prefix Command
client.on("message", async message => {
    //===================
    const atprefix = (process.env.ATPREFIX);
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(atprefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(atprefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});
//========================================
/*
const FNBRCO = require('fnbrco.js');
const fnbr = new FNBRCO(process.env.FNBR);
const { stripIndents } = require("common-tags");
const chalk = require ('chalk');
const Discord = require('discord.js');
const log = console.log
client.on('message', async message => {
  try {
    console.clear()
    let shop = await fnbr.getShop()
    log("Current Daily Shop")
    for (let i = 0; i < shop.daily.length; i++) {
      let shopD = shop.daily[i];
      log("")
      let shpNM = shopD.name
      log("Name:"+ shpNM)
      let shpID = shopD.id
      log("ID: "+ shpID)
      let shpTP = shopD.type
      log("Type: "+ shpTP)
      let shpLK = (`https://image.fnbr.co/${shpTP}/${shpID}/icon.png`)
      log("Link: "+ shpLK)
    } } catch (err){
  console.log(chalk.redBright("ERROR  ") + err)
  }
})
*/
//========================================
client.login(process.env.TOKEN)

