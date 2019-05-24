const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'allservers',
             memberName: 'allservers',
             aliases: [],
             examples: [`${client.commandPrefix}allservers`],
             description: 'Bot Owner Command',
             group: 'owner',
             ownerOnly: true
})
}
        async run(message) {
            this.client.stats(this.client, "cmd", null, null, null)
            let res = await this.client.guilds.map(c => c);
                let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
                .setTimestamp()
                .setTitle(`Server List`)
            let embed2 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed3 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed4 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed5 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
            let embed6 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                //if there are no results
                let i;
                if (res.length === 0) {
                } else if (res.length < 10) {
                    for (i = 0; i < res.length; i++) {
                        embed.addField(`${i + 1}. ${res[i].name}`, `**Server: **${res[i].name} (${res[i].id})\n**Member Count: **\n- Total ${res[i].memberCount}\n- Humans ${res[i].members.filter(m => !m.user.bot).size}\n- Bots: ${res[i].members.filter(m => m.user.bot).size}\n**Role Count: ** ${res[i].roles.size}\n**Emoji Count: **${res[i].emojis.size}\n**Channel Count: **${res[i].channels.size}`)
                    }
                } else {
                    for (i = 0; i < 25; i++) {
                        embed.addField(`${i + 1}. ${res[i].name}`, `**Server: **${res[i].name} (${res[i].id})\n**Member Count: **\n- ${res[i].memberCount}\n- Humans ${res[i].members.filter(m => !m.user.bot).size}\n- Bots: ${res[i].members.filter(m => m.user.bot).size}\n**Role Count: ** ${res[i].roles.size}\n**Emoji Count: **${res[i].emojis.size}\n**Channel Count: **${res[i].channels.size}`)
                    }
                    for (i = 25; i < 25; i++) {
                        embed2.addField(`${i + 1}. ${res[i].name}`, `**Server: **${res[i].name} (${res[i].id})\n**Member Count: **\n- ${res[i].memberCount}\n- Humans ${res[i].members.filter(m => !m.user.bot).size}\n- Bots: ${res[i].members.filter(m => m.user.bot).size}\n**Role Count: ** ${res[i].roles.size}\n**Emoji Count: **${res[i].emojis.size}\n**Channel Count: **${res[i].channels.size}`)
                    }
                    for (i = 50; i < 25; i++) {
                        embed3.addField(`${i + 1}. ${res[i].name}`, `**Server: **${res[i].name} (${res[i].id})\n**Member Count: **\n- ${res[i].memberCount}\n- Humans ${res[i].members.filter(m => !m.user.bot).size}\n- Bots: ${res[i].members.filter(m => m.user.bot).size}\n**Role Count: ** ${res[i].roles.size}\n**Emoji Count: **${res[i].emojis.size}\n**Channel Count: **${res[i].channels.size}`)
                    }
                    for (i = 75; i < 25; i++) {
                        embed4.addField(`${i + 1}. ${res[i].name}`, `**Server: **${res[i].name} (${res[i].id})\n**Member Count: **\n- ${res[i].memberCount}\n- Humans ${res[i].members.filter(m => !m.user.bot).size}\n- Bots: ${res[i].members.filter(m => m.user.bot).size}\n**Role Count: ** ${res[i].roles.size}\n**Emoji Count: **${res[i].emojis.size}\n**Channel Count: **${res[i].channels.size}`)
                    }
                    for (i = 100; i < 25; i++) {
                        embed5.addField(`${i + 1}. ${res[i].name}`, `**Server: **${res[i].name} (${res[i].id})\n**Member Count: **\n- ${res[i].memberCount}\n- Humans ${res[i].members.filter(m => !m.user.bot).size}\n- Bots: ${res[i].members.filter(m => m.user.bot).size}\n**Role Count: ** ${res[i].roles.size}\n**Emoji Count: **${res[i].emojis.size}\n**Channel Count: **${res[i].channels.size}`)
                    }
                    for (i = 125; i < 25; i++) {
                        embed6.addField(`${i + 1}. ${res[i].name}`, `**Server: **${res[i].name} (${res[i].id})\n**Member Count: **\n- ${res[i].memberCount}\n- Humans ${res[i].members.filter(m => !m.user.bot).size}\n- Bots: ${res[i].members.filter(m => m.user.bot).size}\n**Role Count: ** ${res[i].roles.size}\n**Emoji Count: **${res[i].emojis.size}\n**Channel Count: **${res[i].channels.size}`)
                    }
                }

                message.channel.send(embed);
                if(embed2.fields.length !== 0){
                    message.channel.send(embed2)
                }
                if(embed3.fields.length !== 0){
                    message.channel.send(embed3)
                }
                if(embed4.fields.length !== 0){
                    message.channel.send(embed4)
                }
                if(embed5.fields.length !== 0){
                    message.channel.send(embed5)
                }
                if(embed6.fields.length !== 0){
                    message.channel.send(embed6)
                }
}
}