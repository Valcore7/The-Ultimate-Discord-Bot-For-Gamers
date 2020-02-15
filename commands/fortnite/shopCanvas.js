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
      items = fnbr.getImages(item);
      log(items)
    } catch (err) {}
  } }
      /*
      let id = items.id
      let rarity = items.rarity
      let type = items.type
      let name = items.name
      let price = items.price
      //let { id, type, name, price, rarity } = item //Had to remove, was returning variables as undefined
      let link = `https://image.fnbr.co/${type}/${id}/icon.png` //png.png is full avatar for skins //icon.png is just the face of the skin or image of cosmetic
      message.channel.send(link)
      let canvasItems = await canvasItem(channel, client, args, link, name, rarity, price,)
      } catch (err) {
        log(err);
      }
    async function canvasItem(client, channel, args, link, name, rarity, price, ) {
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
    	// Set a new canvas to the dimensions of 512x512 pixels, the size of the icon.png image
	    const canvas = Canvas.createCanvas(512, 512);
	    // ctx (context) will be used to modify a lot of the canvas
      const ctx = canvas.getContext('2d');
      //Create the background depending on rarity
      ctx.beginPath();
      ctx.lineWidth= "1";
      ctx.strokeStyle = "black";
      ctx.fillStyle = rarColor;
      ctx.rect(0,0,512,512)
      ctx.stroke();
      ctx.fill();
      // Since the image takes time to load, you should await it
	    let cosmetic = await Canvas.loadImage(link);
      //let vbuckIcon = await Canvas.loadImage("https://image.fnbr.co/price/icon_vbucks.png")
      // Select the font size and type from one of the natively available fonts
	    ctx.font = '50px sans-serif';
    	// Select the style that will be used to fill the text in
	    ctx.fillStyle = '#ffffff';
	    // Actually fill the text with a solid color
	    ctx.fillText(name, 362, 362);
    	// This uses the canvas dimensions to stretch the image onto the entire canvas
      //                        x, y,   width,        height
	    ctx.drawImage(cosmetic, 0, 0, canvas.width, canvas.height);
      //ctx.drawImage(vbuckIcon, 350, 362, 64, 64);
	    // Use helpful Attachment class structure to process the file for you
	    const attachment = new Discord.Attachment(canvas.toBuffer(), 'item.png');
      message.channel.send(attachment);
    }
  }
};
*/