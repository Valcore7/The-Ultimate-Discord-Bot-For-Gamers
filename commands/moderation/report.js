/**
 * @author T3NED
 * @version 1.1.0
 */

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
	name: "report",
	category: "moderation",
	description: "Reports a member",
	usage: "<mention, id>",
	deleteInvoke: true,
	run: async (client, message, args) => {
		// Find the member to report
		const member = message.mentions.members.first() || message.guild.members.get(args[0]);

		// Error if there is no member
		if (!member) return message.reply("Couldn't find that person?").then(m => m.delete(5000));

		// Prevent unwanted reports
		if (!member.hasPermission("BAN_MEMBERS") || member.user.bot)
			return message.channel.send("Can't report that member").then(m => m.delete(5000));

		// Error if there isn't a reason
		if (!args[1]) {
			return message.channel
				.send("Please provide a reason for the report")
				.then(m => m.delete(5000));
		}

		// Find the reports channel
		const channel = message.guild.channels.find(c => c.name === "reports");

		// Error if there is no report channel
		if (!channel)
			return message.channel.send("Couldn't find a `#reports` channel").then(m => m.delete(5000));

		// Create the report embed
		const embed = new RichEmbed()
			.setColor("#ff0000")
			.setTimestamp()
			.setFooter(message.guild.name, message.guild.iconURL)
			.setAuthor("Reported member", member.user.displayAvatarURL)
			.setDescription(stripIndents`**- Member:** ${member} (${member.user.id})
            **- Reported by:** ${message.member}
            **- Reported in:** ${message.channel}
            **- Reason:** ${args.slice(1).join(" ")}`);

		// Reply to the author
		message.reply("Successfully sent that report!");

		// Send the report embed
		return channel.send(embed);
	}
};
