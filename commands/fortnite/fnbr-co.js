//Code Source: https://github.com/Strandxo/simple-fortnite-api
//Modified by Valcore
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const FNBRCO = require('fnbrco.js');
const fnbr = new FNBRCO(process.env.FNBR)
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "fnbr",
    aliases: ["fnbrco"],
    description: "Display the current store using FNBR.CO API!!",
    usage: "[store]",
    run: async (client, message, args) => {
      if (message.deletable) message.delete()
      var colors = ["#9d4dbb", "#cc0000", "#00aa00"]
      var icons = ["https://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg", "https://img.icons8.com/color/100/000000/close-window.png"]
        channelId = message.channel.id
        let embed = new RichEmbed()
            .setAuthor("Fortnite", icons[0])
            .setDescription(`Gathering today's shop`)
            .setColor(colors[2]);
        message.channel.send(embed).then(msg => msg.delete(2000))
        await shopItems(channelId)
        
        async function shopItems(channel) {
    try {
        let shop = await fnbr.getShop();
        let fChannel = client.channels.find(x => x.id === channel);
        let fembed = new RichEmbed()
            .setColor(colors[0])
            .setDescription(`The items from today's itemshop https://fnbr.co/shop`)
            .setAuthor("Fortnite Daily Itemshop", icons[0])
            .setTimestamp()
        for (let i = 0; i < shop.featured.length; i++) {

            const shopFeatured = shop.featured[i];
            if (!shopFeatured) {
                fembed.addField("Not available cosmetic", "Empty", true)
            } else {
                fembed.addField(shopFeatured.name, shopFeatured.price + " " + shopFeatured.priceIcon, true)
                .setImage(shopFeatured.png)
            }
        }
        embed.addBlankField()
        fChannel.send(fembed)

        let dChannel = client.channels.find(x => x.id === channel);
        let dembed = new RichEmbed()
            .setColor(colors[0])
            .setDescription(`The items from today's itemshop https://fnbr.co/shop`)
            .setAuthor("Fortnite Featured Itemshop")
            .setTimestamp()
        for (let i = 0; i < shop.daily.length; i++) {
            const shopDaily = shop.daily[i];
            dembed.addField(shopDaily.name, shopDaily.price + " " + shopDaily.priceIcon, true)
            .setImage(shopDaily.png)
        }
        dChannel.send(dembed)


    } catch (err) {
        console.error(err)
    }
  }
    }
}