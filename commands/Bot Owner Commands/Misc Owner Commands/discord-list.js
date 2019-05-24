const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const Invites = require('../../../util/models/DiscordServers.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'discord=',
            memberName: 'discord=',
            aliases: [],
            examples: [`${client.commandPrefix}discord=`],
            description: 'Posts all of the discord invites in the discord invites database.',
            group: 'owner',
            ownerOnly: true,
        })
    }
    async run(message) {
        Invites.findOne({ clientID: this.client.user.id }, async (err, db) => {
          if(!db){
              return message.channel.send(`There is no database for the invites.`);
          }else{
            let e = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTimestamp()
            .setTitle(`Discord Invites`)
            .setDescription(db.invites.join('\n'))
            return message.channel.send(e)
          }
        })
    }
}