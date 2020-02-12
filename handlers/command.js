//Original Code creaed by The Source Code (https://github.com/The-SourceCode/Discord.js-Bot-Development)
//Code has been modified by Valcore7 (https://github.com/Valcore7)
//And 10031623 (https://github.com/10031623)

/**
//This is the basic command layout
module.exports = {
 name: "Command name",
 aliases: ["array", "of", "aliases"]
  category: "Category name",
  description: "Command description"
  usage: "[args input]",
  run: (client, message, args) => {
     //The code in here to execute
       }
}
 */
const { readdirSync } = require("fs");
const map = require("fs");
const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status");

module.exports = (client) => {
    readdirSync("./commands/").forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    
        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    
    console.log(table.toString());
}

