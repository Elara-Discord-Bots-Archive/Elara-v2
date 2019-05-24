const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "poke",
            memberName: "poke",
            aliases: [],
            examples: [`${client.commandPrefix}poke @user/userid`],
            description: "Pokes the user you mention or their user id",
            group: "image",
            args: [
                {
                    key: "user",
                    prompt: "What user do you want to poke?",
                    type: "user"
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const gifs = ["https://media.tenor.com/images/995f47f14620ce56de98675b4a1479d5/tenor.gif", "https://media.tenor.com/images/99f14733e78652e24a7ca5dc553af073/tenor.gif", "https://media1.tenor.com/images/efce56eba8ffb9e07a7afc0751ad58ed/tenor.gif?itemid=12498610", "https://media1.tenor.com/images/1dbb668137ae32cb54cdd375c76decd1/tenor.gif?itemid=3577622", "https://media1.tenor.com/images/391270644db948f053a4f9397dcb8e68/tenor.gif?itemid=4986346", "https://cdn.nekos.life/poke/poke_019.gif", "https://cdn.nekos.life/poke/poke_016.gif", "https://i.giphy.com/media/Vfie0DJryAde8/giphy.gif"]
        if (user.id === message.author.id) return message.reply(`You can't poke yourself silly :wink:`)
        const result = Math.floor(Math.random() * gifs.length);
            let e = new Discord.RichEmbed()
            .setDescription(`Poke \n\n**${message.author}** Poked **${user}**!`)
            .setImage(gifs[result])
            .setColor("RANDOM")
        message.channel.send(e)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}
