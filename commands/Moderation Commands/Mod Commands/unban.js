const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            memberName: "unban",
            aliases: [],
            examples: [`${client.commandPrefix}unban @user/userid`],
            description: "Unbans the member",
            group: "mod",
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to unban?',
                    type: 'user'
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "BAN_MEMBERS")) return;
        try{
        message.delete().catch()
                message.guild.unban(user.id, `Unbanned By: ${message.author.tag}`)
                    .then(() => {
                        let embed = new Discord.RichEmbed()
                            .setColor(`RANDOM`)
                            .setFooter(`This message will delete in 10 seconds.`, this.client.user.displayAvatarURL)
                            .setDescription(`Member Unbanned\n${user} ${user.tag} (${user.id})`)
                        message.channel.send(embed).then(m => {
                            m.delete(10000).catch()
                        })
                    }).catch(err => {
                        message.channel.send(`Failed to unban ${user.tag}`)
                    });
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }

    }
}