const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
const moment = require('moment-timezone')
module.exports = class WhoisCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo',
            memberName: 'userinfo',
            group: 'info',
            aliases: [`ui`],
            description: 'Gets information about a user.',
            format: 'UserID|UserName(partial or full)',
            examples: [`${client.commandPrefix}userinfo @user`],
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want the info about?',
                    type: 'user',
                    default: msg => msg.author
                }
            ]
        })
    }

    async run(msg, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let embed = new Discord.RichEmbed();
            if(msg.guild){
                embed.setAuthor(msg.guild.name, msg.guild.iconURL)
                embed.setFooter(`Want to see another users info? Do ${msg.guild._commandPrefix ? msg.guild._commandPrefix : this.client.commandPrefix}userinfo @user/userid`)
            }else{
                embed.setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                embed.setFooter(`Want to see another users info? Do ${this.client.commandPrefix}userinfo @user/userid`)
            }
            embed.setColor(`RANDOM`)
            .setThumbnail(user.displayAvatarURL)
            .setTimestamp()
            .setDescription(`
            **User: **${user} \`@${user.tag}\` (${user.id})
            **Discriminator: ** #${user.discriminator}
            **Avatar: ** [Click Here](${user.displayAvatarURL})
            **Bot: ** ${user.bot ? `Yes ${this.client.util.emojis.robot}` : `No ${this.client.util.emojis.human}`}
            **Created At: ** ${moment(user.createdAt).format('dddd, MMMM Do YYYY')}
            **Nitro/Partner: ** ${user.displayAvatarURL.includes('.gif') ? "Nitro/Partner User": "Normal User"}
            `)
            if(this.client.isOwner(user.id)){
            embed.addField(`Bot Owner`, `${this.client.isOwner(user.id) ? "Yes, Hi Boss <:SmileyHearts:485361754633797654>" : "No"}`, true)
            }
       
        msg.say(embed)
        } catch (e) {
            this.client.error(this.client, msg, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
}
