const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            memberName: "ban",
            aliases: [],
            examples: [`${client.commandPrefix}ban @user <reason here>`],
            description: "Bans the user.",
            group: "mod",
            guildOnly: true,
            clientPermissions: ["BAN_MEMBERS"],
            args: [
                {
                    key: "user", 
                    prompt: "what user do you want me to ban?",
                    type: "user"
                },
                {
                    key: 'reason',
                    prompt: 'What is the reason for this ban?',
                    type: 'string',
                    default: "No Reason Provided"
                }
            ]
        })
    }
    async run(message, {user, reason }) {
        this.client.stats(this.client, "cmd", null, null, null)
    if(this.client.perms(this.client, message, "BAN_MEMBERS")) return;
    try{
    if(message.guild.members.get(user.id)) {
    if(user.id === this.client.user.id) return message.say(`I can't ban myself.`);
    if(message.guild.members.get(user.id).hasPermission("MANAGE_MESSAGES")) return message.say(`I can't ban a Mod/Admin.`);
    if(user.id === message.guild.ownerID) return message.say(`I can't ban the server owner.`);
    let mod = message.author;
    let embed = new Discord.RichEmbed()
    .setAuthor(`Member Banned`, user.displayAvatarURL)
    .addField(`Banned User`,`**Mention: **${user}\n **Tag: **${user.tag}\n **Nickname: **${message.guild.members.get(user.id).nickname ? message.guild.members.get(user.id).nickname : "None"}\n **ID: **${user.id}`)
    .addField(`Banned By`, `**Mention: **${mod}\n**ID: **${mod.id}`)
    .addField(`Reason`, reason)
    .setColor(`#FF0000`)
    .setTimestamp()
    .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
message.guild.ban(user.id, { reason: `${reason} | Banned By: ${mod.tag}` }).then(async () => {
    this.client.actionlog(this.client, message.guild, embed)
    await message.say(`${this.client.util.semoji}**${user.tag}** has been banned.`)
})
}else {
if (user.id === this.client.user.id) return message.say(`I can't ban myself.`);
if (user.id === message.guild.ownerID) return message.say(`I can't ban the server owner.`);
let mod = message.author;
let embed = new Discord.RichEmbed()
    .setColor(`#FF0000`)
    .setAuthor(`Member Banned`, user.displayAvatarURL)
    .addField(`Banned User`, `**Mention: **${user}\n **Tag: **${user.tag}\n **ID: **${user.id}`)
    .addField(`Banned By`, `**Mention: **${mod}\n**ID: **${mod.id}`)
    .addField(`Reason`, reason)
    .setTimestamp()
    .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
message.guild.ban(user.id, { reason: `${reason} | Banned By: ${mod.tag}` }).then(async () => {
    this.client.actionlog(this.client, message.guild, embed)
    await message.say(`${this.client.util.emojis.semoji}**${user.tag}** has been banned.`)
})
}
} catch (e) {
    this.client.error(this.client, message, e);
this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
    }
}