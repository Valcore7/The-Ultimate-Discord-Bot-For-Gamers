//Code source: https://github.com/The-SourceCode/Discord.js-Bot-Development/blob/master/Ep_14/commands/fun/fortnite.js
//Code Source: https://github.com/JDaatselaar/statscool-old/blob/master/bot.js#L111
//Code Source: https://github.com/Strandxo/simple-fortnite-api
//Modified by Valcore7
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
//Fortnite Tracker API  //For Stats and Challenges
const Client = require("fortnite");
const ft = new Client(process.env.FORTNITE);
//FNBR.CO API  //For Item Shop
const FNBRCO = require('fnbrco.js');
const fnbr = new FNBRCO(process.env.FNBR)

module.exports = {
    name: "fortnite",
    aliases: ["ft"],
    description: "Display someone's stats, the current store, and challenges!!",
    usage: "<platform username | shop>",
    run: async (client, message, args) => {
        //FNBR.CO Item Shop
      if (args[0].toLowerCase() === "shop") {
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
   } else {
     //Fortnite Tracker API
          const platforms = ["pc", "xb1", "psn"];          
            const lastWord = args[args.length - 1].toLowerCase();
            
            let platform, username; 

            if (platforms.includes(lastWord)) {
                username = args[1]; 
                platform = lastWord;
            } else {    
                username = args[1];
                platform = "pc";
            };
            
            const search = await ft.user(username, platform);

            if (!search.username) {
              if (message.deletable) message.delete()
                return message.channel.send("Couldn't find that person, try again")
                    .then(m => m.delete(5000));
            };

            const lifetime = search.stats.lifetime;
            const solo = search.stats.solo;
            const duo = search.stats.duo;
            const squad = search.stats.squad;

            const embed = new RichEmbed()
                .setTitle(`${search.username} (${search.platform})`)
                .setURL(search.url)
                .setColor("#9d4dbb")
                .setFooter(`Fortnite stats`, message.author.displayAvatarURL)
                .setTimestamp()
                .addField("Solo:", stripIndents`**- Wins:** ${solo.wins}
                **- KD:** ${solo.kd}
                **- Kills:** ${solo.kills}
                **- Kills per match:** ${solo.kills_per_match}`, true)
                .addField("Duo:", stripIndents`**- Wins:** ${duo.wins}
                **- KD:** ${duo.kd}
                **- Kills:** ${duo.kills}
                **- Kills per match:** ${duo.kills_per_match}`, true)
                .addField("Squad:", stripIndents`**- Wins:** ${squad.wins}
                **- KD:** ${squad.kd}
                **- Kills:** ${squad.kills}
                **- Kills per match:** ${squad.kills_per_match}`, true)
                .addField("Lifetime:", stripIndents`**- Wins:** ${lifetime.wins}
                **- KD:** ${lifetime.kd}
                **- Kills:** ${lifetime.kills}`, false)
            if (message.deletable) message.delete()
            message.channel.send(embed)
        }
    }
}