//Code Source: https://github.com/JDaatselaar/statscool-old/blob/master/bot.js#L111
//Code Source: https://github.com/Strandxo/simple-fortnite-api
//Modified by Valcore7
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
//FNBR.CO API  //For Item Shop
const FNBRCO = require('fnbrco.js');
const fnbr = new FNBRCO(process.env.FNBR)
// configurations and credentials
const ftemail = require(process.env.FTEMAIL);
const ftpass = require(process.env.FTPASS);
const credentials = {
    email: ftemail,
    password: ftpass
};
const api = new FortniteClient(credentials);
module.exports = {
    name: "fortnite",
    aliases: ["ft"],
    description: "Display someone's stats, the current store, and challenges!!",
    usage: "<platform username | shop>",
    run: async (client, message, args) => {
      var colors = ["#9d4dbb", "#cc0000", "#00aa00"]
      var icons = ["https://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg", "https://img.icons8.com/color/100/000000/close-window.png"]
        //FNBR.CO Item Shop
      if (args[0].toLowerCase() === "shop") {
          if (message.deletable) message.delete()
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
                fembed.addField("**"+ shopFeatured.name +"**", shopFeatured.price + " " + shopFeatured.priceIcon, true)
                .setImage(shopFeatured.png)
            }
        }
          embed.addBlankField()
          fChannel.send(fembed).then(msg => msg.delete(600000))

          let dChannel = client.channels.find(x => x.id === channel);
          let dembed = new RichEmbed()
              .setColor(colors[0])
              .setDescription(`The items from today's itemshop https://fnbr.co/shop`)
             .setAuthor("Featured")
             .setTimestamp()
          for (let i = 0; i < shop.daily.length; i++) {
              const shopDaily = shop.daily[i];
              dembed.addField("**"+ shopDaily.name +"**", shopDaily.price + " " +   shopDaily.priceIcon, true)
             .setImage(shopDaily.png)
         }
         dChannel.send(dembed).then(msg => msg.delete(600000))
      } catch (err) {
         console.error(err)
     }
    }
   }
     //Fortnite Tracker API
     //User Stats
     if (args[0].toLowerCase() === "stats") {
          if (message.deletable) message.delete(),
          console.log("stats"),
          message.channel.send("stats")
        }
    }
        }
          //Fortnite News
        if (args[0].toLowerCase() === "news") {
          if (message.deletable) message.delete(),
          console.log("news"),
          message.channel.send("news")
        }
          //Fortnite Challenges
        if (args[0].toLowerCase() === "challenges") {
          if (message.deletable) message.delete(),
          console.log("challenges"),
          message.channel.send("challenges")
        }
        //Fortnite Item Search
        if (args[0].toLowerCase() === "item") {
          if (message.deletable) message.delete(),
          console.log("item"),
          message.channel.send("item")
        }
        if (args[0].toLowerCase() === "status") {
          if (message.deletable) message.delete(),
          console.log("status"),
          message.channel.send("status")
        }
    }
}
    