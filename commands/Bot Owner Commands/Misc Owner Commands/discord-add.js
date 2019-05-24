const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const Invites = require('../../../util/models/DiscordServers.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'discord+',
             memberName: 'discord+',
             aliases: [],
             examples: [`${client.commandPrefix}discord+ <Invite link>`],
             description: 'Adds a discord server to the list...',
             group: 'owner',
             ownerOnly: true,
             args: [
                {
                    key: "invite",
                    prompt: "What is the invte for that server?",
                    type: "string"
                }
              ]
})
}
        async run(message, {invite}) {
        Invites.findOne({clientID: this.client.user.id}, async (err, db) => {
            if(!db){
                let i = await this.client.fetchInvite(invite).catch(err => {console.log(err)});
                if(!i) return message.channel.send(`That invite is expired.`);
                if(!i.guild.name) return message.channel.send(`ERROR:\nCouldn't find the guild name for that invite.`)
                const newdb = new Invites({
                    clientID: this.client.user.id, 
                    invites: [`**${i.guild.name}: **${invite}`]
                });
                newdb.save().catch(err => console.log(err));
                let e = new Discord.RichEmbed()
                .setDescription(`Invite Added: ${invite}`)
                .setColor(`RANDOM`)
                return message.channel.send(e);
            }else{
                let i = await this.client.fetchInvite(invite).catch(err => console.log(err));
                if(!i) return message.channel.send(`Invite is expired.`);
                if (!i.guild.name) return message.channel.send(`ERROR:\nCouldn't find the guild name for that invite.`)
                db.invites.push(`**${i.guild.name}: **${invite}`)
                db.save().catch(err => console.log(err));
                let e = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setDescription(`Invite Added: ${invite}`)
                return message.channel.send(e);
            }
        })
}
}