const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const reps = require('../../../util/models/reps.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'rep+',
             memberName: 'rep+',
             aliases: [`rep`],
             examples: [`${client.commandPrefix}rep @user`],
             description: 'Gives a Reputation Point to the user you mention',
             group: 'fun',
             throttling: {
                usages: 1,
                duration: 1000
             },
             args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to give reputation point to?',
                    type: 'user'
                }
              ]
})
}
        async run(message, {user}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        if(!this.client.isOwner(message.author.id) && message.author.id === user.id) return message.channel.send(`You can't give reputation points yourself...`);
        if(user.bot) return message.channel.send(`You can't give a reputation point to a bot!.`)
        await reps.findOne({userID: user.id}, async (err, db) => {
            if(!db){
                const newdb = new reps({
                    userTag: user.tag,
                    userID: user.id,
                    reps: 1

                });
                newdb.save().catch(err => console.log(err));
                let embed = new Discord.RichEmbed()
                .setAuthor(user.tag, user.displayAvatarURL)
                .setColor(`RANDOM`)
                .setTimestamp()
                .setDescription(`${message.author} has given a reputation point to ${user}\nNow ${user} has 1 Reputation Point`)
                return message.channel.send(embed)
            }else{
                db.reps = db.reps + 1;
                db.save().catch(err => console.log(err));
                let embed = new Discord.RichEmbed()
                .setAuthor(user.tag, user.displayAvatarURL)
                .setColor(`RANDOM`)
                .setTimestamp()
                .setDescription(`${message.author} has given a reputation point to ${user}\nNow ${user} has ${db.reps} Reputation Points`)
                return message.channel.send(embed)
            }
        })
    } catch(e) {
        this.client.error(this.client, message, e)
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
}
}
