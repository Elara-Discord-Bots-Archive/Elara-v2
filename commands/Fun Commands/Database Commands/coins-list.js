const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'balance',
             memberName: 'balance',
             aliases: [`bal`],
             examples: [`${client.commandPrefix}balance @user/id/name`],
             description: 'Checks the balance of you or another user.',
             group: 'fun',
             guildOnly: true,
             args: [
                {
                    key: 'user',
                    prompt: "What user do you want to check the balance for?",
                    type: 'user',
                    default: message => message.author
                }
              ]
})
}
        async run(message, {user}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        if(user.bot) return message.channel.send(`Bot's don't get any coins.`)
        this.client.dbcoins.findOne({userID: user.id, guildID: message.guild.id}, async (err, db) => {
            if(!db){
                return message.channel.send(`You don't have any coins in the database.`)
            }else{
                let e = new Discord.RichEmbed()
                .setAuthor(user.tag, user.displayAvatarURL)
                .setColor(`RANDOM`)
                .addField(`Balance`, `${db.coins} Coins`)
                message.channel.send(e)
            }
        })
    } catch(e) {
        this.client.error(this.client, message, e)
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
}
}
