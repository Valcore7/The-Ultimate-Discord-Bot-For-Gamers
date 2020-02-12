//Code by Valcore7
const prefix = (process.env.PREFIX)
module.exports = {
 name: "ftlfg",
 aliases: ["lookingforgroup","fntlfg","fortnitelfg","fortnightlfg","ftlookingforgroup","fntlookingforgroup","fortnitelookingforgroup","fortnightlookingforgroup"],
  category: "fortnite",
  description: "You can look for a group. If you and someone else are looking for the same group, then it will pair you with them and create a new text channel.",
  usage: ('Type '+ prefix +'lfg <group type>'),
  run: (client, message, args) => {
     //========
     console.log('arg 0 ='+ args[0])
     if (message.deletable) message.delete()
     // No args?
     if (!args[0]) {
        return message.reply('Type '+ prefix +'lfg <group type>')
                .then(m => m.delete(5000));
        };
        
    //Logs the group name in console
      const group = args[0];
      console.log(group)
//========================================
      //Testing
      if (args[0] === 'duos'){
        //Need to check is role exisits already
        //Need to check if bot has permissions
        if (message.member.roles.some(role => role.name === ('lfg'+ group +''))) {
          console.log("already has role")
          return message.channel.send('You are already looking for a '+ group +'.').then(m => m.delete(5000));

        } else {
          let role = message.guild.roles.find(role => role.name === 'lfg'+ group)
          message.member.addRole(role).then(message.channel.send('You are now looking for a '+ group +'.'))
          message.channel.send('').then(m => m.delete(5000));

        }
        };
      //Role creation
      /**
guild.roles.create({ data: { name: 'lfgduos', permissions: []}});
*/
      //Duos
      //Trios
      //Squads
      //Stop
      //Check if another user has that same role
      //error
  }
}