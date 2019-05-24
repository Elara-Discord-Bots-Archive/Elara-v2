const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'warn',
             memberName: 'warn',
             aliases: [`strike`],
             examples: [`${client.commandPrefix}warn @user reason`],
             description: 'Warns the user that you mention',
             group: 'mod',
             args: [
                {
                    key: 'member',
                    prompt: 'What member do you want to warn?',
                    type: 'member'
                },
                {
                    key: "reason",
                    prompt: "What is the reason for this warn?",
                    type: "string"
                }
              ]
})
}
        async run(message, {member, reason}) {
            this.client.stats(this.client, "cmd", null, null, null)
            if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
            try{
            if(message.author.id === member.id) return message.channel.send(`You can't warn yourself! :face_palm:`);
            let e = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setColor(this.client.util.colors.red)
            .setDescription(`You can't warn a bot! ${this.client.util.emojis.robot}`)
            .setTitle(`ERROR`)
            .setTimestamp()
            .setThumbnail("https://vgy.me/1SuBGQ.gif")
            if(member.user.bot) return message.channel.send(e);
        this.client.warns.findOne({guildID: message.guild.id, userID: member.id}, async(err, db) => {
            if(!db){
                const newdb = new this.client.warns({
                    userID: member.id,
                    userTag:  member.user.tag,
                    guildID: message.guild.id,
                    guildName: message.guild.name,
                    warns: [`**Moderator: **${message.author} \`${message.author.tag}\` (${message.author.id})\n**Reason: **${reason}`] 
                });
                newdb.save().catch(error => {
                console.log(error)
                return message.channel.send(`There was a error trying to save this to the database!`)
                });
                let embed = new Discord.RichEmbed()
                    .setDescription(`${this.client.util.emojis.semoji} ${member} has been warned.`)
                    .setColor(`RANDOM`)
                    .setAuthor(message.guild.name, message.guild.iconURL)
                let m = await message.channel.send(embed)
                let e = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setDescription(`You have been warned`)
                .addField(`Server`, message.guild.name)
                .addField(`Reason`, reason)
                member.send(e).catch(err => {
                if(err){
                let e = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setColor(`#FF0000`)
                .setDescription(`${this.client.util.emojis.nemoji} ${member}'s dms are off, The warning has been logged`)
                m.edit(e)
                }
                });
                this.client.db.findOne({ guildID: message.guild.id }, (err, settings) => {
                    if (settings.actionlog) {
                        let modlogs = message.guild.channels.get(settings.actionlog)
                        if(!modlogs) return;
                        const warnembed = new Discord.RichEmbed()
                            .setColor(`#ff0000`)
                            .setTitle(`Warning Issued`)
                            .setDescription(`**Member: **${member} \`${member.user.tag}\` (${member.id})\n**Moderator: **${message.author} \`${message.author.tag}\` (${message.author.id})`)
                            .addField(`Reason`, `${reason}`)
                            .setTimestamp()
                            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
                        modlogs.send(warnembed)
                    };
                })
            }else{
                db.warns.push(`**Moderator: **${message.author} \`${message.author.tag}\` (${message.author.id})\n**Reason: **${reason}`)
                db.save().catch(err => console.log(err));
                let embed = new Discord.RichEmbed()
                    .setDescription(`${this.client.util.emojis.semoji} ${member} has been warned.`)
                    .setColor(`RANDOM`)
                    .setAuthor(message.guild.name, message.guild.iconURL)
                let m = await message.channel.send(embed)
                let e = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setDescription(`You have been warned`)
                .addField(`Server`, message.guild.name)
                .addField(`Reason`, reason)
                member.send(e).catch(err => {
                if(err){
                let e = new Discord.RichEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL)
                .setColor(`#FF0000`)
                .setDescription(`${this.client.util.emojis.nemoji} ${member}'s dms are off, The warning has been logged`)
                m.edit(e)
                }
                });
                this.client.db.findOne({ guildID: message.guild.id }, (err, settings) => {
                    if (settings.actionlog) {
                        let modlogs = message.guild.channels.get(settings.actionlog)
                        if (!modlogs) return;
                        const warnembed = new Discord.RichEmbed()
                            .setColor(`#ff0000`)
                            .setTitle(`Warning Issued`)
                            .setDescription(`**Member: **${member} \`${member.user.tag}\` (${member.id})\n**Moderator: **${message.author} \`${message.author.tag}\` (${message.author.id})`)
                            .addField(`Reason`, `${reason}`)
                            .setTimestamp()
                            .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
                        modlogs.send(warnembed)
                    };
                })
            }
        })
        } catch (e) {
            this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
}
}