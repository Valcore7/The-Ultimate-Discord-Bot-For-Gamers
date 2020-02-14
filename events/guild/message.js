const { botMentioned } = require("../../functions");

module.exports = {
	async run(client, message) {
		// Find a possible prefix in the message
		const prefixes = [process.env.PREFIX, ...botMentioned(message)];
		let prefix = "";
		for (fix of prefixes) {
			if (message.content.startsWith(fix)) {
				prefix = fix;
			}
		}

		// Prevent self loops, dm messages, and content with no prefix
		if (message.author.bot || !message.guild || !prefix) return;

		// Ensure the client and member are cached
		if (!message.guild.me) await message.guild.fetchMember(client.user);
		if (!message.member) await message.guild.fetchMember(message.author);

		// Define the command parameters
		const args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		const cmd = args.shift().toLowerCase();
		const command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

		// Invoke the command
		if (command && command.run) {
			// Delete the command message if specified
			if (command.deleteInvoke && message.deletable) await message.delete();

			// Check the client's permissions
			if (
				command.clientPerms &&
				!command.clientPerms.every(x => message.guild.me.hasPermission(x))
			) {
				return message.channel
					.send(
						`❌ I am missing one of the following permissions: ${command.clientPerms.join(", ")}`
					)
					.then(m => m.delete(5000));
			}

			// Check the authors permissions
			if (command.userPerms && !command.userPerms.every(x => message.member.hasPermission(x))) {
				return message.channel
					.send(
						`❌ You are missing one of the following permissions: ${command.userPerms.join(", ")}`
					)
					.then(m => m.delete(5000));
			}
			// Run the file
			command.run(client, message, args);
		}
	}
};
