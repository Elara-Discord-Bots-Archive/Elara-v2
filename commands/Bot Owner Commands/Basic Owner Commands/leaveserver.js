const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class LSCommand extends Command {
    constructor(client) {
        super(client, {
            name: "leaveserver",
            group: 'owner',
            ownerOnly: true,
            aliases: ["ls"],
            description: "Makes the bot leave the server",
            examples: [`${client.commandPrefix}leaveserver <Server ID>`],
            memberName: "leaveserver",
            args: [{
                key: "server",
                prompt: "What server do you want me to leave?",
                type: "string"
            }]
        })
    }
    async run(msg, { server }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let guild = this.client.guilds.get(server);
        let defaultChannel = "";
        guild.channels.forEach((channel) => {
            if (channel.type == "text" && defaultChannel == "") {
                if (channel.permissionsFor(guild.me).has("SEND_MESSAGES" && "EMBED_LINKS" && "READ_MESSAGES")) {
                    defaultChannel = channel;
                }
            }
        })
        let embed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setAuthor(this.client.user.username, this.client.user.displayAvatarURL)
            .setDescription(`I have been removed from this server.
            For more information please contact [${this.client.owners[0].tag}](${this.client.options.invite})`)
        defaultChannel.send(embed).then(async () => {await guild.leave()}).then(async () => {
            await msg.channel.send(`${this.client.util.emojis.semoji} I have left ${guild.name}`)
        })
    } catch (e) {
    this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
    }
    
    }
}