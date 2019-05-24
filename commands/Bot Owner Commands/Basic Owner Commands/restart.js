const { Command } = require('../../../util/Commando');
const Discord = require('discord.js');
module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: "restart",
            aliases: ["rt"],
            memberName: "restart",
            group: "owner",
            ownerOnly: true,
            description: "Restarts the bot"
        })
    }
    async run(message){
        this.client.stats(this.client, "cmd", null, null, null, "restart")
        try{
        message.delete(15000).catch();
        const filter = m => m.author.id === message.author.id;
        message.reply("Are you sure you want to restart the bot? `y` or `n`, This command will timeout in 15 seconds").then(q => q.delete(15000))
        message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000
        }).then(async collected => {
            collected.delete(15000);
            let ca = collected.first().content.toLowerCase();
            if (ca === 'n' || ca === "no" || collected.first().content === this.client.util.emojis.semoji || ca === "❌") {
                collected.first().delete(15000).catch();
                return message.say("Restart Aborted").then(m => m.delete(15000).catch());
            }
            let cr = collected.first().content.toLowerCase();
            if (cr === "y" || cr === "yes" || cr === "✅" || cr === this.client.util.emojis.nemoji) {
                collected.first().delete(15000).catch();
                let embed = new Discord.RichEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL)
                .setColor(this.client.util.colors.yellow)
                .setDescription(`Restarting ${this.client.emojis.get('426956230582599690')}`)
                .setTimestamp()
                this.client.channels.get(this.client.config.log).send(embed)
            .then(m => {
            m.delete(15000).catch() 
            message.react('426956230582599690')
            }).then(
            setTimeout(async () => {this.client.destroy().then(this.client.login(this.client.config.token))}, 15001)
            .then(await 
            message.say(`Successfully Restarted. ${this.client.util.emojis.semoji}`)
            .then(c => c.delete(15000).catch())));
            }
        }).catch(err => {
            message.reply("Restart Aborted..").then(r => r.delete(15000));
        });
    
        } catch (e) {
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}