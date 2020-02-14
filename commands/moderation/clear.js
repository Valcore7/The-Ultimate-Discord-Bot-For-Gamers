/**
 * @author T3NED
 * @version 1.1.0
 */

module.exports = {
	name: "clear",
	aliases: ["purge", "nuke"],
	category: "moderation",
	description: "Clears the chat",
	deleteInvoke: true,
	userPerms: ["MANAGE_MESSAGES"],
	clientPerms: ["MANAGE_MESSAGES"],
	async run(client, message, args) {
		// Run checks on the purge amount
		const amount = parseInt(args[0]);
		if (isNaN(amount) || !(amount && amount <= 100))
			return message.reply("Please provide a valid amount!").then(m => m.delete(5000));

		// Delete the messages
		message.channel
			.bulkDelete(amount, true)
			.then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
			.then(m => m.delete(5000))
			.catch(err => message.reply(`Something went wrong... ${err}`));
	}
};
