const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const moment = require('moment');
const {perms} = require('../../../util/perms.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'roleinfo',
             memberName: 'roleinfo',
             aliases: [`ri`],
             examples: [`${client.commandPrefix}roleinfo @role/roleid/rolename`],
             description: 'Gives you the information about the role',
             group: 'server',
             args: [
                {
                    key: 'role',
                    prompt: 'What role do you want to check the info on?',
                    type: 'role'
                }
              ]
})
}
        async run(message, {role}) {
          this.client.stats(this.client, "cmd", null, null, null)
        try{
          const jsdiscordperms = require('jsdiscordperms');
          var permissions = await jsdiscordperms.convertPerms(role.permissions);
          let p = Object.entries(permissions).filter(([perm, allowed]) => allowed).map(([perm]) => `${perms[perm]}`);
          // console.log(allowed)
          let embed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL)
            .setDescription(`
            **Name: **${role.name}
            **ID: **${role.id}
            **Tag: ** \`${role}\`
            **Mention: ** ${role}
            **Hoisted: ** ${role.hoist ? "Yes": "No"}
            **Mentionable: ** ${role.mentionable ? "Yes": "No"}
            **Editable By ${this.client.user.username}: ** ${role.editable ? "Yes": "No"}
            **Position: ** ${role.position}
            **Hex Color: ** ${role.hexColor}
            **Member Size: ** ${role.members.size}
            **Role Created At: ** ${moment(role.createdAt).format('dddd, MMMM Do YYYY')}
            `)
            .addField(`Permissions`, `\`\`\`${p.join(', ')}\`\`\``)
            .setFooter(`Requested By: ${message.author.tag}`, message.author.displayAvatarURL)
            //**: ** ${}
            .setColor(role.hexColor)
            .setTimestamp()
          message.channel.send(embed)
        } catch (e) {
          this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
}
}