/**
 * @author T3NED
 * @version 1.1.0
 */

module.exports = {
	name: "ping",
	category: "fun",
	description: "Returns latency and API ping",
	deleteInvoke: true,
	run: async (client, message, args) => {
		const msg = await message.channel.send(`🏓 Pinging....`);
		msg.edit(
			[
				"🏓 Pong!",
				`Latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`,
				`API Latency is ${Math.round(client.ping)}ms`
			].join("\n")
		);
	}
};
