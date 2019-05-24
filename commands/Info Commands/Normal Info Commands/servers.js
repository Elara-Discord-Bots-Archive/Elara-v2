const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const request = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "servers",
            memberName: "servers",
            aliases: [],
            examples: [`${client.commandPrefix}servers`],
            description: "Gives you the list of servers the bot is in.",
            group: "info"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let str = '';
        this.client.guilds.forEach(guild => {str += `
        **Name: **${guild.name}
        **MemberCount: **
        - Total: ${guild.memberCount}
        - Humans: ${guild.members.filter(m => !m.user.bot).size}
        - Bots: ${guild.members.filter(m => m.user.bot).size}\n\n`})
        if(str.length < 2000){
            let e = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
                .setDescription(str)
                .setTitle(`List of Servers`)
            message.channel.send(e)
        }else{
        let string = '';
        this.client.guilds.forEach(guild => { string += `Name: ${guild.name}\nMemberCount: ${guild.memberCount}\nHumans: ${guild.members.filter(m => !m.user.bot).size}\nBots: ${guild.members.filter(m => m.user.bot).size}` + '\n\n'; })
        let {body} = await request
            .post(`https://paste.lemonmc.com/api/json/create`)
            .send({
                data: `List of servers for ${this.client.user.tag}\n\n${string}`,
                language: 'text',
                private: true,
                title: `Server List [${this.client.guilds.size}]`,
                expire: '2592000'
            }).catch(err => {
                message.channel.send(`ERROR:\n${err}`)
            })
        let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
        let e = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
        .setDescription(`List of Servers: [Click Here](${link})`)
        message.channel.send(e)
        }
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}