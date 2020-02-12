//Basic discord requirements
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const cmd = require("discord.js-commando")
const { config } = require("dotenv");
 const client = new Client({
    disableEveryone: true
}); 

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
    console.log('Prefix is ' + process.env.PREFIX);
    console.log('AtPrefix is ' + process.env.ATPREFIX);
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
    const prefix = (process.env.PREFIX);
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

client.login(process.env.TOKEN)

