//Original Code creaed by Discord.js-Commando Documentaion (https://discordjs.guide/commando/)
//Code has been modified by Valcore7 (https://github.com/Valcore7)
//And 10031623 (https://github.com/10031623)

module.exports = {
    name: "ping",
    category: "fun",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
      if (message.deletable) message.delete()
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!
        Latency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        API Latency is ${Math.round(client.ping)}ms`);
    }
}