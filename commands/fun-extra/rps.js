/**
 * @author T3NED
 * @version 1.1.0
 */

const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
	name: "rps",
	category: "fun",
	description: "Rock Paper Scissors game. React to one of the emojis to play the game.",
	run: async (client, message, args) => {
		// Build the game start embed
		const embed = new RichEmbed()
			.setColor("#ffffff")
			.setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
			.setDescription("Add a reaction to one of these emojis to play the game!")
			.setTimestamp();

		// Send the game start embed
		const m = await message.channel.send(embed);

		// Instantiate the message as a prompt
		const reacted = await promptMessage(m, message.author, 30, chooseArr);

		// Randomize the bot's result
		const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

		// Get the user's result
		const result = await getResult(reacted, botChoice);

		// Clear the prompt embed
		await m.clearReactions();

		// Display the final score
		embed.addField(result, `${reacted} vs ${botChoice}`);

		// Update the prompt embed with the results
		m.edit(embed);

		function getResult(me, clientChosen) {
			if (
				(me === "🗻" && clientChosen === "✂") ||
				(me === "📰" && clientChosen === "🗻") ||
				(me === "✂" && clientChosen === "📰")
			) {
				return "You won!";
			} else if (me === clientChosen) {
				return "It's a tie!";
			} else {
				return "You lost!";
			}
		}
	}
};
