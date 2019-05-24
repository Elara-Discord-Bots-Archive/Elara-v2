const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');

module.exports = class AddRoleCommand extends Command {
    constructor(client) {
        super(client, {
            name: "removerole",
            group: "mod",
            aliases: ["role-"],
            memberName: "removerole",
            description: "Removes a role from the member.",
            examples: [`${client.commandPrefix}role- @user <Role Name>`],
            guildOnly: true,
            args: [
                {
                    key: 'member',
                    prompt: 'What member do you want me to remove the role from?',
                    type: 'member'
                },
                {
                    key: "role",
                    prompt: "What role do you want me to remove from the member?",
                    type: "role"
                }
            ]
        })
    }

    async run(message, { member, role }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(this.client.perms(this.client, message, "MANAGE_ROLES")) return;
        if (!member.roles.has(role.id)) return message.say("They don't have that role..");
        member.removeRole(role.id, `Was removed By: ${message.author.tag} (${message.author.id}`).catch(e => {
            let eb = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setTitle(`ERROR`)
                .setDescription(`${e}`)
                .addField(`Why am I getting this error?.`, `To fix this error.\n1. Make sure that the bot has \`Manage Roles\` permission in server settings.\n2. Make sure that the Bot's highest role is above the role you are trying to give to someone.\n3. If none of those worked Join the Support Server and Ask one of the Support Team members about this issue. [Click Here](${this.client.options.invite})`)
           return message.channel.send(eb)
        })
        let embed = new Discord.RichEmbed()
        .setAuthor(`Action`, message.guild.iconURL)
        .setColor(`#FF000`)
        .setTimestamp()
        .setDescription(`Role Removed: ${role}`)
        .addField(`INFO`, `**Member: **${member} \`${member.user.tag}\` (${member.id})\n**Moderator: **${message.author} \`${message.author.tag}\` (${message.author.id})`)
        await this.client.log(this.client, message.guild, embed) 
        await message.react(this.client.util.emojis.sreact)   
    }catch(e){
        this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
};
