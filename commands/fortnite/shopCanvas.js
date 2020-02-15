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
const { Attachment, RichEmbed } = require('discord.js');
const Canvas = require('canvas');

const log = console.log // no lol //why?

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
    if (["shop", "store", "itemshop", "item-shop"].includes(args[0]))
		 {
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
      // Declare the item from the arguments 
      const item = args.slice(1).join(" ")
      if (!item) return message.channel.send("Please specify an item!");

      // Send the fetching message
      const fetching = await message.channel.send(`Fetching **${item}**...`)

      // Fetch the images relative to the item
      let items = await fnbr.getImages(item)
      if (!items[0]) return message.reply("Could not find that item!");
      let { rarity, name, price, id, type } = items[0];
      let link = `https://image.fnbr.co/${type}/${id}/icon.png`

      // Generate a new image with canvas
      const finalItem = await canvasItem(channel, client, args, link, name, rarity, price);
      await fetching.delete().catch(() => null);
      if (finalItem) message.channel.send(finalItem);
      } catch (err) {
        log(err);
        message.channel.send(`An error occurred: ${err}`) 
      }
    async function canvasItem(client, channel, args, link, name, rarity, price) {
      // Determine the color of the background
      let rarityColor;
      switch(rarity) {
        case "legendary": 
          rarityColor = "#ff6d00";
          break;
        case "uncommon":
          rarityColor = "#26c300";
          break;
        case "rare": 
         rarityColor = "#0060e2";
         break;
        case "epic":
         rarityColor = "#7034a9";
         break;
        default: 
         rarityColor = colors[0];
      }
  
      // Register the fortnite font
      Canvas.registerFont('fortnite.ttf', { family: 'Fortnite' }) 
  
      // Initalise a frame for the canvas
	    const canvas = Canvas.createCanvas(512, 512); 

      // Set the image type and 
      const ctx = canvas.getContext('2d'); 

      // Create the background based on the rarity color specified
      ctx.beginPath(); 
      ctx.lineWidth= "6";
      ctx.strokeStyle = "black";
      ctx.fillStyle = rarityColor;
      ctx.rect(0,0,512,512)
      ctx.stroke();
      ctx.fill();
     
      // Creating the image returns a promise, we wait for it to resolve
	    let cosmetic = await Canvas.loadImage(link); 
      let vbuckIcon = await Canvas.loadImage("https://image.fnbr.co/price/icon_vbucks.png")
   
      // Draw the cosmetic onto the canvas and aligns it to the frame
	    ctx.drawImage(cosmetic, 0, 0, canvas.width, canvas.height);

      // Assign the font specs
	    ctx.font = '50px Fortnite'; 
      ctx.fillStyle = '#ffffff';
      ctx.lineWidth= "24";
      ctx.strokeStyle= 'black';
	    ctx.fillText(price, 96, 468); // Item price
      ctx.fillText(name, canvas.width/3.5, 396) // Item name
     
      // Draw the vbuck icon to the image
      ctx.drawImage(vbuckIcon, 32, 424, 64, 64); 

      // Make the image a Discord attachment
	    return new Attachment(canvas.toBuffer(), 'item.png');
   
    }
  }
};
