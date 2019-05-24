const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js'),
    { cookies } = require('../../../util/photos.js')
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "cookie",
            memberName: "cookie",
            aliases: ["cookies"],
            examples: [`${client.commandPrefix}cookie @user/userid`],
            description: "Gives a Cookie to a user",
            group: "image",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to give a cookie to?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try {
            const replies = cookies;
            let cUser = user;
            if (cUser.id === message.author.id) return message.say(`You can't give yourself a cookie silly :wink:`)
            let usernameid = message.author;
            let result = Math.floor((Math.random() * replies.length));
            let embed = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription("<a:Dots:426956230582599690> Loading the Command, Please Wait....")

            message.channel.send(embed).then(message => {
                embed.setColor("RANDOM")
                embed.setDescription(`${usernameid} Has Given a Cookie to ${cUser}:cookie::yum::cookie:`)
                embed.setImage(replies[result])
                embed.setFooter(`Cookie ${result}/${replies.length}`)
                message.edit(embed)
            })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}