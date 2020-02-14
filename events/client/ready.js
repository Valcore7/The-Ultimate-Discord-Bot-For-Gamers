module.exports = {
	run(client) {
		console.log(
			[
				`Hi, ${client.user.tag} has logged into Discord!`,
				`My prefix is ${process.env.PREFIX}`,
				`Feel free to use my mention prefix with @${client.user.username}`
			].join("\n")
		);

		client.user.setPresence({
			status: process.env.STATUS,
			game: {
				name: process.env.ACTIVITY,
				type: process.env.ACTIVITY_TYPE
			}
		});
	}
};
