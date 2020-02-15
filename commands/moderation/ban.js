/**
 * @author T3NED
 * @version 1.1.0
 */

const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../functions.js");

module.exports = {
	name: "ban",
	category: "moderation",
	description: "bans the member",
	usage: "<id | mention>",
	deleteInvoke: true,
	clientPerms: ["BAN_MEMBERS"],
	userPerms: ["BAN_MEMBERS"],
	async run(client, message, args) {
		// Error if there aren't any args
		if (!args[0]) {
			return message.reply("Please provide a user to ban.").then(m => m.delete(5000));
		}

		// Error if there is no reason
		if (!args[1]) {
			return message.reply("Please provide a reason for the ban.").then(m => m.delete(5000));
		}

		// Find the member to ban
		const member = message.mentions.members.first() || message.guild.members.get(args[0]);

		// Error if there is no member
		if (!member) {
			return message.reply("Couldn't find that member, try again").then(m => m.delete(5000));
		}

		// Self and other user ban check
		if ([message.author.id, client.user.id].includes(member.id) || !member.bannable)
			return message.reply("I cannot ban that member!").then(m => m.delete(5000));

		// Send a log embed to the log channel
		const embed = new RichEmbed()
			.setColor("#ff0000")
			.setThumbnail(member.user.displayAvatarURL)
			.setFooter(message.member.displayName, message.author.displayAvatarURL)
			.setTimestamp().setDescription(stripIndents`**- Offender:** ${member} (${member.id})
            **- Moderator:** ${message.member} (${message.member.id})
            **- Reason:** ${args.slice(1).join(" ")}`);

		const promptEmbed = new RichEmbed()
			.setColor("GREEN")
			.setAuthor(`This verification becomes invalid after 30s.`)
			.setDescription(`Do you want to ban ${member}?`);

	const logChannel = message.guild.channels.find(c => c.name.includes("logs")) || message.channel;

		// Send the message
		await message.channel.send(promptEmbed).then(async msg => {
			// Await the reactions and the reactioncollector
			const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

			// Verification stuffs
			if (emoji === "✅") {
				msg.delete();

				member.ban(args.slice(1).join(" ")).catch(err => {
					if (err)
						return message.channel.send(
							`Well.... the ban didn't work out. Here's the error: ${err}`
						);
				});

				logChannel.send(embed);
			} else if (emoji === "❌") {
				msg.delete();

				message.reply(`Ban canceled.`).then(m => m.delete(5000));
			}
		});
	}
};
