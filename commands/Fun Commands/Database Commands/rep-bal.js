const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const reps = require('../../../util/models/reps.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'rep=',
             memberName: 'rep=',
             aliases: [`reputations`, `replist`, `repbal`],
             examples: [`${client.commandPrefix}rep= @user`],
             description: 'Checks how many reputation points you or the person you mention has.',
             group: 'fun',
             throttling: {
                usages: 1,
                duration: 1000
             },
             args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to check their reputation points?',
                    type: 'user',
                    default: message => message.author
                }
              ]
})
}
        async run(message, {user}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        if(user.bot) return message.channel.send(`Bot's don't have any reputation points.`)
        reps.findOne({userID: user.id}, async (err, db) => {
            if(!db){
            let e = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(user.tag, user.displayAvatarURL)
                .setDescription(`${user} doesn't have any reputation points.`)
            return message.channel.send(e)
            }else{
                let e = new Discord.RichEmbed()
                    .setColor(`RANDOM`)
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setDescription(`${user} has ${db.reps} Reputation points`)
                return message.channel.send(e)
            }
        })
            } catch (e) {
                this.client.error(this.client, message, e)
                this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}