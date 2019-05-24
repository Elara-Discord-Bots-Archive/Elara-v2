const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const request = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "get",
            memberName: "get",
            aliases: [`getuser`],
            examples: [`${client.commandPrefix}get @user/userid/username`],
            description: "Bot Owner Command.",
            ownerOnly: true,
            group: "owner",
            args: [
                {
                    key: 'content',
                    prompt: 'What is the id you want me to check out?',
                    type: 'string'
                },
                {
                    key: "type",
                    prompt: "What type: [user, server]",
                    type: "string"
                }
            ]
        })
    }
    async run(msg, {content, type}) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(type.toLowerCase() === "user"){
        const matches = content.match(/^(?:<@!?)?([0-9]+)>?$/);
        const user = await this.client.fetchUser(matches[1])
        let server = this.client.guilds.filter(c => c.members.get(user.id));
        let str = server.map(c => `
        Guild: [${c.name}] (${c.id})
        Nickname: ${c.members.get(user.id).nickname ? c.members.get(user.id).nickname : "None"}
        Admin: ${c.members.get(user.id).hasPermission("MANAGE_GUILD") ? "Yes" : "No"}
        Mod: ${c.members.get(user.id).hasPermission('MANAGE_MESSAGES') ? "Yes" : "No"}
        Roles: ${c.members.get(user.id).roles.size > 1 ? this.client.functions.arrayClean(null, c.members.get(user.id).roles.map((r) => { if (r.name !== '@everyone') { return r.name; } return null; })).join(' | ') : '**None**'}\n\n`)
        let e = new Discord.RichEmbed()
            .setAuthor(`Information on ${user.tag}`, user.displayAvatarURL)
            .setColor(`RANDOM`)
            .setThumbnail(user.displayAvatarURL)
            .setTimestamp()
        if (server.size !== 0) {
            let { body } = await request
                .post(`https://paste.lemonmc.com/api/json/create`)
                .send({
                    data: `${user.tag}\n\n${str.join('\n')}`,
                    language: 'text',
                    private: true,
                    title: `Info on ${user.tag}`,
                    expire: '2592000'
                }).catch(err => {
                    message.channel.send(`ERROR:\n${err}`)
                })
            let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
            this.link = link;
            e.setDescription(`**User: **${user} \`${user.tag}\` (${user.id})\n**Mutual Servers: **[Click Here](${link})\n**Mutual Servers Count: **${server.size}`)
        } else {
            e.setDescription(`**User: **${user} \`${user.tag}\` (${user.id})\n**Mutual Servers: **None\nMutual Servers Count: **None`)
        }
        if (this.client.isOwner(user.id)) {
            e.addField(`Bot Owner`,`Yes, Hi Boss <:SmileyHearts:485361754633797654>`, true)
        }
        if (this.client.guilds.get(this.client.config.support).members.get(user.id)) {
            let role = this.client.guilds.get(this.client.config.support).members.get(user.id).roles.has("499409601616412673")
            if (role === true) {
                e.addField(`Bot Support`, `${role ? "Yes" : "No"}`, true)
            }
        }
        msg.say(e)
    }else
    if(type.toLowerCase() === "server"){
    let guild = this.client.guilds.get(content);
    let e = new Discord.RichEmbed()
    .setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL)
    .setColor(`RANDOM`)
    .setThumbnail(guild.iconURL)
    .setDescription(`
    **Name: **${guild.name}
    **ID: **${guild.id}
    **Icon: **${guild.iconURL ? `[Click Here](${guild.iconURL})` : "None"}
    **Member Count: **
     -Total Members: ${guild.memberCount}
     -Bots: ${guild.members.filter(c => c.user.bot).size}
     -Humans: ${guild.members.filter(c => !c.user.bot).size}
    **Role Count: **${guild.roles.size}
    **Emoji Count: **${guild.emojis.size}
    **Channel Count: **${guild.channels.size}
    **Owner: **\n${guild.owner.user}\n\`@${guild.owner.user.tag}\`\n(${guild.owner.user.id})
    `)
    .setTimestamp()
    .setTitle(`Server Information`)
    msg.channel.send(e)
    }
    } catch (e) {
    this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
    }
    }
}