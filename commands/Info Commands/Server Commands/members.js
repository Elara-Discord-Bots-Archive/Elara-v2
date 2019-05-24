const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const request = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "members",
            memberName: "members",
            aliases: ["listmembers"],
            examples: [`${client.commandPrefix}members <role name/id>`],
            description: "Gives you all of the members in that role.",
            group: "server",
            guildOnly: true,
            args: [

                {
                    key: 'role',
                    prompt: 'Please Provide the role.',
                    type: 'role'
                }
            ]
        })
    }
    async run(message, { role }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
            let res = await message.guild.roles.get(role.id).members.map(c => c);
            let e = new Discord.RichEmbed().setAuthor(message.guild.name, message.guild.iconURL).setColor(`RANDOM`).setDescription(`There is no one in that role.`).setTimestamp().setTitle(`INFO`)
            if(res.length === 0) return message.channel.send(e)
            let member = role.members.map(c => `${c.user.tag} (${c.user.id})`);
            let { body } = await request.post(`https://paste.lemonmc.com/api/json/create`)
                .send({
                    data: `Members in Role: ${role.name}\n\n${member.join('\n')}`,
                    language: 'text',
                    private: true,
                    title: `Member in Role`,
                    expire: '2592000'
                }).catch(err => {
                    message.channel.send(`ERROR:\n${err}`)
                })
            let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
                .setTimestamp()
                .setTitle(`Members in role **${role.name}**`)
            let i;
            if(res.length > 25){
                embed.setDescription(`**Note:** This role has over 25 members, Here is the rest of the list: [Click Here](${link})`)
            }
            //if there are no results
            if (res.length === 0) {
            } else if (res.length < 10) {
                for (i = 0; i < res.length; i++) {
                    embed.addField(`${i + 1}. ${res[i].user.username}`, `${res[i].user} \`${res[i].user.tag}\` (${res[i].user.id})`)
                }
            } else {
                if(res.length < 25){
                for (i = 0; i < 25; i++) {
                    embed.addField(`${i + 1}. ${res[i].user.username}`, `${res[i]} \`${res[i].user.tag}\` (${res[i].user.id})`)
                }
            }else{
                 for (i = 0; i < 10; i++) {
                    embed.addField(`${i + 1}. ${res[i].user.username}`, `${res[i]} \`${res[i].user.tag}\` (${res[i].user.id})`)
                }
            }
            }
            message.channel.send(embed);
        } catch (e) {
            let member = role.members.map(c => `${c.user.tag} (${c.user.id})`);
            let { body } = await request.post(`https://paste.lemonmc.com/api/json/create`)
                .send({
                    data: `Members in Role: ${role.name}\n\n${member.join('\n')}`,
                    language: 'text',
                    private: true,
                    title: `Member in Role`,
                    expire: '2592000'
                }).catch(err => {
                    message.channel.send(`ERROR:\n${err}`)
                })
            let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
                .setTimestamp()
                .setTitle(`Members in role ${role.name}`)
                .setDescription(`[Click Here](${link})`)
            if(e.stack.includes("TypeError: Cannot read property 'user' of undefined")) return message.channel.send(embed)
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}