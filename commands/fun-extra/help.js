/**
 * @author T3NED
 * @version 1.1.0
 */

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "help",
	aliases: ["h"],
	category: "info",
	description: "Returns all commands, or one specific command info",
	deleteInvoke: true,
	async run(client, message, args) {
		if (args[0]) return getCMD(client, message, args[0]);
		getAll(client, message);
	}
};

function getAll(client, message) {
	// Define the help embed
	const embed = new RichEmbed()
		.setTitle(`${client.user.username}'s Help Menu`)
		.setColor("RANDOM")
		.setThumbnail(client.user.displayAvatarURL);

	// Filter all of the categories
	const categories = [...new Set(client.commands.map(x => x.category))]
		.filter(x => x)
		.map(x => x.toLowerCase());

	// Function to get all the command under a category
	const commands = category => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `- \`${cmd.name}\``)
			.join("\n");
	};

	// List all of the commands under their categories
	const info = categories
		.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
		.reduce((string, category) => string + "\n" + category);

	// Send the help embed
	return message.channel.send(embed.setDescription(info));
}

function getCMD(client, message, input) {
	const embed = new RichEmbed();

	const cmd =
		client.commands.get(input.toLowerCase()) ||
		client.commands.get(client.aliases.get(input.toLowerCase()));

	let info = `No information found for command **${input.toLowerCase()}**`;

	if (!cmd) {
		return message.channel.send(embed.setColor("RED").setDescription(info));
	}

	if (cmd.name) info = `**Command name**: ${cmd.name}`;
	if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
	if (cmd.description) info += `\n**Description**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**: ${cmd.usage}`;
		embed.setFooter(`Syntax: <> = required, [] = optional`);
	}

	return message.channel.send(
		embed
			.setColor("GREEN")
			.setDescription(info)
			.setThumbnail(client.user.displayAvatarURL)
	);
}
