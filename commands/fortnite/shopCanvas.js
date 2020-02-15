//FNBR.CO API  //For Item Shop
const FNBRCO = require("fnbrco.js");
const fnbr = new FNBRCO(process.env.FNBR);
// embed variables
var colors = ["#9d4dbb", "#cc0000", "#00aa00"];
var icons = [
	"https://pbs.twimg.com/profile_images/1017458813199372289/QtGv1tyn_400x400.jpg",
	"https://img.icons8.com/color/100/000000/close-window.png"
];
//Require Canvas
const Discord = require('discord.js');
const Canvas = require('canvas');

const log = console.log

module.exports = {
	name: "tf",
	category: "fortnite",
	description: "gets the shop",
	usage: "<shop>",
	deleteInvoke: true,
	userPerms: [],
	clientPerms: [],
	async run(client, message, args) {
    channel = message.channel.id;
    //Shop
		//Gets the current item shop with FNBR.CO API
		if (
			args[0] === `shop` ||
			args[0] === `store` ||
			args[0] === `itemshop` ||
			args[0] === `item-shop`
		) {
			channelId = message.channel.id;
			let embed = new RichEmbed()
				.setAuthor("Fortnite", icons[0])
				.setDescription(`Gathering today's shop`)
				.setColor(colors[2]);
			message.channel.send(embed).then(msg => msg.delete(20000));
			await shopItems(channelId);
		}
		async function shopItems(channel) {
			try {
				let shop = await fnbr.getShop();
				let dChannel = client.channels.find(x => x.id === channel);
				let dembed = new RichEmbed()
					.setColor(colors[0])
					.setDescription(`The items from today's itemshop https://fnbr.co/shop`)
					.setAuthor("Fortnite Daily Itemshop")
					.setTimestamp();
				for (let i = 0; i < shop.daily.length; i++) {
					const shopDaily = shop.daily[i];
          let { name, price, rarity } = shopDialy[i]
          let link = `https://image.fnbr.co/${shop.daily.type}/${shop.daily.id}/icon.png` //png.png is full avatar for skins //icon.png is just the face of the skin or image of cosmetic
					dembed.addField(
						shopDaily.name,
						`[IMAGE](${link})  ${shopDaily.price}  ${shopDaily.priceIcon}`,
						true
					);
				}
				dChannel.send(dembed);

				let fChannel = client.channels.find(x => x.id === channel);
				let fembed = new RichEmbed()
					.setColor(colors[0])
					.setDescription(`The items from today's itemshop https://fnbr.co/shop`)
					.setAuthor("Fortnite Featured Itemshop", icons[0])
					.setTimestamp();
				for (let i = 0; i < shop.featured.length; i++) {
					const shopFeatured = shop.featured[i];
					if (!shopFeatured) {
						fembed.addField("No available cosmetics", "Empty", true);
					} else {
						fembed
							.addField(shopFeatured.name, shopFeatured.price + " " + shopFeatured.priceIcon, true)
							.setImage(shopFeatured.png);
					}
				}
				fChannel.send(fembed);
			} catch (err) {
				console.error(err), message.channel.send("AN ERROR HAS OCCURED");
			}
		}
  if (args[0] === 'item')
    try {
      //Need to add a way to set item to a set of arguments, that all may not be defined. An item can be up to 5 words.
      /*
      EX:
      if message = ?tf item Renegade Raider
      then item =  Renegade Raider
      Please help!!
      */ 
      let item = "Renegade Raider"
      message.channel.send(`Getting: |${item}|`)
      items = await fnbr.getImages(item)
      log(items)
      console.clear()
      let rarity = items[0].rarity
      log(rarity)
      let name = items[0].name
      let price = items[0].price
      let itmId = items[0].id
      let itmType = items[0].type
      //let { id, type, name, price, rarity } = item //Had to remove, was returning variables as undefined
      let link = `https://image.fnbr.co/${itmType}/${itmId}/icon.png` //png.png is full avatar for skins //icon.png is just the face of the skin or image of cosmetic
      message.channel.send(link)
      let canvasItems = await canvasItem(channel, client, args, link, name, rarity, price)
      } catch (err) {
        log(err);
      }
    async function canvasItem(client, channel, args, link, name, rarity, price) {
      //Fortnite Font: https://db.onlinewebfonts.com/t/703617a01296c595b1daed4c5de1f6b7.ttf
      let rarColor = rarity;
				if (rarColor === "legendary") {
					rarColor = '#ff6d00';
				} else if (rarColor === "uncommon") {
					rarColor = '#26c300';
				} else if (rarColor === "rare") {
					rarColor = '#0060e2';
				} else if (rarColor === "epic") {
					rarColor = '#7034a9';
				} else {
					rarColor = colors[0];
				}
      const { registerFont } = require('canvas')
      registerFont('fortnite.ttf', { family: 'Burbank Big Condensed Bold' }) 
      //https://www.npmjs.com/package/canvas //canvas docs
	    // ctx (context) will be used to modify a lot of the canvas
    	// Set a new canvas to the dimensions of 512x512 pixels, the size of the icon.png image
      //https://github.com/RudySPG/Discord_Themes/blob/fe6cc8bc420c67623aca4df4beef6cc76c56261a/theme_files/fortnite/v1/sources/css/fortnite_fonts.css //Dont worry about this, just dont delete it.
	    const canvas = Canvas.createCanvas(512, 512); 
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.lineWidth= "1";
      ctx.strokeStyle = "black";
      ctx.fillStyle = rarColor;
      ctx.rect(0,0,512,512)
      ctx.stroke();
      ctx.fill();
      // Since the image takes time to load, you should await it
	    let cosmetic = await Canvas.loadImage(link);
      let vbuckIcon = await Canvas.loadImage("https://image.fnbr.co/price/icon_vbucks.png")
    	// This uses the canvas dimensions to stretch the image onto the entire canvas
      //                        x, y,   width,        height
	    ctx.drawImage(cosmetic, 0, 0, canvas.width, canvas.height);
      // Select the font size and type from one of the natively available fonts
	    ctx.font = '50px Burbank Big Condensed Bold'; 
    	// Select the style that will be used to fill the text in
	    ctx.fillStyle = '#ffffff';
	    // Actually fill the text with a solid color
	    ctx.fillText(name, 24, 24); //Need to move it to the lower part of the image
      ctx.drawImage(vbuckIcon, 12, 12, 64, 64); //Need to move it to the lower part of the image and to the left of the text
	    // Use helpful Attachment class structure to process the file for you
	    const attachment = new Discord.Attachment(canvas.toBuffer(), './item.png');
      message.channel.send(attachment);
    }
  }
};
