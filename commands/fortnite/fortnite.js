//Original Code By: https://github.com/JDaatselaar/statscool-old/blob/master/bot.js#L111
//Modified By: Valcore7

//Required packages
const { RichEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

//FortniteClient API
const FortniteClient = require('fortnite-client').FortniteClient;
const ftemail = require(process.env.FTEMAIL);
const ftpass = require(process.env.FTPASS);
const credentials = {
    email: ftemail,
    password: ftpass
};
const api = new FortniteClient(credentials);
//FNBR.CO API  //For Item Shop

const FNBRCO = require('fnbrco.js');
const fnbr = new FNBRCO(process.env.FNBR);

// embed variables
var colors = ["#9d4dbb", "#cc0000", "#00aa00"];
var icons = ["https://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg", "https://img.icons8.com/color/100/000000/close-window.png"];

module.exports = {
    name: "fortnite",
    aliases: ["ft","fortnight","fnbr","fnbrco"],
    description: "Display someone's stats, the current store, and challenges!!",
    usage: "<pc || xb1 || ps4> <week || alltime> <all || solo || duo || squad> <username> || <shop> || <status> || <news> <br || stw || bp || tn>",
    run: async (client, message, args) => {
      //Get a users stats through FortniteClient
      if (args[0] === `stats` || args[0] === `userstats` || args[0] === `user-stats`) {
          if (args[0] === `pc` || args[0] === `xb1` || args[0] === `ps4`) { //=
        let platform = args[1]//=
        let channelId = message.channel.id
        let fntuser = args[3]//=
        let timeAll = args[1] //= //can be week or alltime //to fetch the stats for the user for the past week or dor alltime
        let timewindow;
        if (timeAll) {
            timewindow = timeAll.toLowerCase()
        }
        let gamemode = args[2];//=
        let gamemodeName = gamemode
        let timewindowName = timewindow
        if (!timewindow) {
            timewindow = "alltime"
            timewindowName = "alltime"
        } else if (timewindow === 'week' || timewindow === '7' || timewindow === 'weekly') {
            timewindow = "weekly"
            timewindowName = "the past 7 days"
        } else if (timewindow === 'alltime' || timewindow === 'alltime') {
            timewindow = 'alltime'
            timewindowName = 'alltime'
        } else {
            gamemode = args[1];//= //if the command user does not specify a time window, then it will set gamemode to the first argument and set the time window to alltime. It will also set the fntuser to the correct args variable.
            if (!fntuser === gamemode) {
              fntuser = args[2]//=
            } else {
              fntuser = args[3]//=
            }
            timewindow = "alltime"
            timewindowName = "alltime"
        }

        if (!gamemode) {
            gamemode = 'allGroupTypes'
            gamemodeName = "all"
        } else if (!(gamemode.toLowerCase() === 'solo' || gamemode.toLowerCase() === 'duo' || gamemode.toLowerCase() === 'squad')) {
            return error(`${gamemode} is not a __valid__ gamemode`, channelId)
        }
        let embed = new RichEmbed()
            .setAuthor("Fortnite", icons[0])
            .setDescription(`Checking stats with **Username** ${fntuser}, **Platform** ${platform}, **Gamemode** ${gamemodeName} and **timewindow** ${timewindowName}`)
            .setColor(colors[2]);
        message.channel.send(embed).then(msg => msg.delete(20000))
        await getFtnStats(args[0], platform, gamemode, timewindow, channelId);
        setTimeout(function () {
            message.delete().catch()
        }, 5000);

      }
    }
    //Allows a user to search for an item in fortnite with FortniteClient
    if (args[0] === `item`) {
        let item = args.join(" ");
        let channelId = message.channel.id;
        let embed = new RichEmbed()
            .setAuthor("Fortnite", icons[0])
            .setDescription(`Searching items with **Query** ${item}`)
            .setColor(colors[2]);
        message.channel.send(embed).then(msg => msg.delete(20000))
        await lookupItems(item, channelId)
        setTimeout(function () {
            message.delete().catch()
        }, 5000);
    }
    //Gets the current item shop with FNBR.CO API
    if (args[0] === `shop` || args[0] === `store` || args[0] === `itemshop` || args[0] === `item-shop`) {
        channelId = message.channel.id
        let embed = new RichEmbed()
            .setAuthor("Fortnite", icons[0])
            .setDescription(`Gathering today's shop`)
            .setColor(colors[2]);
        message.channel.send(embed).then(msg => msg.delete(20000))
        await shopItems(channelId)
        
    }
    //Gets Fortnites current server status with FortniteClient
    if (args[0] === `status`) {
        try {
            let status = await FortniteClient.CHECK_STATUS();
            console.log(status[0].message);
            let embed = new RichEmbed()
                .setAuthor("Fortnite Status", icons[0])
                .setDescription(status[0].message.replace(".", ""))
                .setColor(colors[0])
            message.channel.send(embed)
        } catch (err) {
            console.error(err)
            error(err, message.channel.id)
        }
    }
    //Gets the news from fortnite with FortniteClient
    if (args[0] === `news`) {
        let typeArg = args[1]
        let type;
        if (!typeArg || typeArg.toLowerCase() === 'br' || typeArg.toLowerCase() === 'battle royale') {
            type = 'br'
        } else if (typeArg.toLowerCase() === 'stw' || typeArg.toLowerCase() === 'save the world') {
            type = 'stw'
        } else if (typeArg.toLowerCase() === 'bp' || typeArg.toLowerCase() === 'battle pass' || typeArg.toLowerCase() === 'battlepass') {
            type = 'bp'
        } else if (typeArg.toLowerCase() === 'tn' || typeArg.toLowerCase() === 'tournament' || typeArg.toLowerCase() === 'tournaments') {
            type = 'tn'
        }
        await ftnNews(type, message.channel.id)
    }

// All the async functions for the commands
async function getFtnStats(fntuser, platform, mode, time, channel) {
    // console.log(username, platform, channel, mode)
    let sChannel = client.channels.find(x => x.id === channel)
    let modeName = mode
    let timeName = time
    if (timeName === 'weekly') {
        timeName = "the past 7 days"
    }
    if (modeName === 'allGroupTypes') {
        modeName = 'all modes'
    }
    try {
        const playerLookup = await api.lookup(fntuser);
        const playerStats = await api.getBattleRoyaleStatsById(playerLookup.id, time);
        if (isEmpty(playerStats.stats[platform])) {
            return error(`There are no stats on **${platform}** for **${fntuser}** in ${timeName}`, channel)
        }

        let embed = new RichEmbed()
            .setAuthor("Fortnite stats", icons[0])
            .setDescription(`The **${platform.toUpperCase()}** stats of **${playerLookup.displayName}** in **${modeName}** in **${timeName}**`)
            .setColor(colors[0])
            .addField("Wins", playerStats.stats[platform][mode].placetop1 || '0', true)
            .addField("Kills", playerStats.stats[platform][mode].kills || '0', true)
            .addField("Matches", playerStats.stats[platform][mode].matchesPlayed || "'", true)
            .addField("Score", playerStats.stats[platform][mode].score || '0', true)
            .addField("K/D", Math.round(playerStats.stats[platform][mode].kills || '0' / (playerStats.stats[platform][mode].matchesPlayed || '0' - playerStats.stats[platform][mode].placetop1 || '0') * 100) / 100, true)
            .addField("Win%", `${Math.round(playerStats.stats[platform][mode].matchesPlayed || '0' / playerStats.stats[platform][mode].placetop1 || '0' * 100)/100}%`, true);
        sChannel.send(embed);
    } catch (err) {
        console.error(err);
    }
}

async function lookupItems(itemName, channel) {
    try {
        let sChannel = client.channels.find(x => x.id === channel);
        let items = await fnbr.getImages(itemName)
        if (items.length === 0) {
            return error(`There was no cosmetic found with the query: **${itemName}**`, channel)
        }
        let fnbrURL = `https://fnbr.co/${items[0].type}/${items[0].name.replace(" ", "-").replace(" ", "-")}`
        let imagePath = items[0].images.icon
        if (!imagePath) {
            console.log('imagePath changed')
            imagePath = items[0].images.featured
            let imagePath2 = items[0].images.featured
            if (!imagePath2) {
                imagePath = items[0].images.png
                imagePath2 = items[0].images.png
                if (!imagePath2) {
                    imagePath = icons[1]
                }
            }
        }
        let rarityColor = items[0].rarity
        if (rarityColor === 'legendary') {
            rarityColor = '#ff6d00'
        } else if (rarityColor === 'uncommon') {
            rarityColor = '#26c300'
        } else if (rarityColor === 'rare') {
            rarityColor = '#0060e2'
        } else if (rarityColor === 'epic') {
            rarityColor = '#7034a9'
        } else {
            rarityColor = colors[0]
        }

        let embed = new RichEmbed()
            .setAuthor("Fortnite Item", icons[0])
            .setDescription(`**${items[0].name}** ${fnbrURL} `)
            .setThumbnail(imagePath)
            .setColor(rarityColor)
            .addField("Name", items[0].name, true)
            .addField("Price", `${items[0].price} ${items[0].priceIcon}`, true)
            .addField("Rarity", items[0].rarity.charAt(0).toUpperCase() + items[0].rarity.substr(1), true)
            .addField("Type", items[0].type.charAt(0).toUpperCase() + items[0].type.substr(1), true);
        sChannel.send(embed).then(msg => msg.delete(300000))
    } catch (err) {
        console.error(err);
        return error("Some error came up. **We currently can't show upcoming items nor backpacks.**", channel)
    }
}

async function shopItems(channel) {
    try {
        let shop = await fnbr.getShop();
        let sChannel = client.channels.find(x => x.id === channel);
        let embed = new RichEmbed()
            .setColor(colors[0])
            .setDescription(`The items from today's itemshop https://fnbr.co/shop`)
            .setAuthor("Fortnite Itemshop", icons[0])
        for (let i = 0; i < shop.featured.length; i++) {

            const shopFeatured = shop.featured[i];
            if (!shopFeatured) {
                embed.addField("Not available cosmetic", "Empty", true)
            } else {
                embed.addField(shopFeatured.name, shopFeatured.price + " " + shopFeatured.priceIcon, true)
            }
        }
        embed.addBlankField()
        for (let i = 0; i < shop.daily.length; i++) {
            const shopDaily = shop.daily[i];
            embed.addField(shopDaily.name, shopDaily.price + " " + shopDaily.priceIcon, true)
        }
        sChannel.send(embed).then(msg => msg.delete(300000))


    } catch (err) {
        console.error(err)
    }
}

async function ftnNews(type, channel) {
    let sChannel = client.channels.find(x => x.id === channel)
    try {
        var news = await FortniteClient.GET_GAME_NEWS()
    } catch (err) {
        console.log(err)
    }
    if (type === 'br') {
        for (let i = 0; i < news.battleroyalenews.news.messages.length; i++) {
            let imageURL = news.battleroyalenews.news.messages[i].image
            if (!imageURL) {
                imageURL = icons[1];
            }
            let embed = new RichEmbed()
                .setColor(colors[0])
                .setTitle(news.battleroyalenews.news.messages[i].title)
                .setAuthor("Fortnite " + news.battleroyalenews.news._type, icons[0])
                .setDescription(news.battleroyalenews.news.messages[i].body)
                .setThumbnail(imageURL)
            sChannel.send(embed)
        }
    } else if (type === 'stw') {
        for (let i = 0; i < news.savetheworldnews.news.messages.length; i++) {
            let imageURL = news.savetheworldnews.news.messages[i].image
            if (!imageURL) {
                imageURL = icons[1];
            }
            let embed = new RichEmbed()
                .setColor(colors[0])
                .setTitle(news.savetheworldnews.news.messages[i].title)
                .setAuthor("Fortnite Save The World News", icons[0])
                .setDescription(news.savetheworldnews.news.messages[i].body)
                .setThumbnail(imageURL)
            sChannel.send(embed)
        }
    } else if (type === 'bp') {
        for (let i = 0; i < news.battlepassaboutmessages.news.messages.length; i++) {
            let imageURL = news.battlepassaboutmessages.news.messages[i].image
            if (!imageURL) {
                imageURL = icons[1];
            }
            let embed = new RichEmbed()
                .setColor(colors[0])
                .setTitle(news.battlepassaboutmessages.news.messages[i].title)
                .setAuthor("Fortnite Battlepass Information", icons[0])
                .setDescription(news.battlepassaboutmessages.news.messages[i].body)
                .setThumbnail(imageURL)
            sChannel.send(embed)
        }
    } else if (type === 'tn') {
        for (let i = 0; i < news.tournamentinformation.tournament_info.tournaments.length; i++) {
            let imageURL = news.tournamentinformation.tournament_info.tournaments[i].loading_screen_image
            let period = news.tournamentinformation.tournament_info.tournaments[i].schedule_info
            if (period === 'SOLO' || period === 'DUO' || period.endsWith("Prizes")) {
                period = "Not specified"
            }
            if (!imageURL) {
                imageURL = icons[1];
            }

            let embed = new RichEmbed()
                .setColor(colors[0])
                .setTitle(news.tournamentinformation.tournament_info.tournaments[i].long_format_title)
                .setAuthor("Fortnite Tournament Information", icons[0])
                .setDescription(news.tournamentinformation.tournament_info.tournaments[i].flavor_description)
                .setThumbnail(imageURL)
                .addField("Pins", news.tournamentinformation.tournament_info.tournaments[i].pin_score_requirement, true)
                .addField("Period", period.replace("!" || ".", ""), true)
            sChannel.send(embed)
        }
    }
}

function error(message, channel) {
    let sChannel = client.channels.find(x => x.id === channel);
    let embed = new RichEmbed()
        .setAuthor("Error", icons[1])
        .setDescription(message)
        .setColor(colors[1]);
    sChannel.send(embed).then(msg => msg.delete(300000))
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
}}