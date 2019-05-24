const { Command } = require('../../../util/Commando'),
  util = require('../../../util/util.js');
Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "log",
            memberName: "log",
            aliases: [`logchannel`],
            examples: [`${client.commandPrefix}log #channel`],
            description: "Sets the modlogs channel for the server.",
            group: "admin",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 60000
            },
            args: [
                {
                    key: "channel",
                    prompt: "What channel do you want me to log to?",
                    type: "channel"
                }
            ]
        })
    }
    async run(message, {channel}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_GUILD")) return;
        
        try{
        this.client.db.findOne({ guildID: message.guild.id }, async (err, settings) => { 
        if (err) console.log(err); 
        if (!settings) {
            return message.channel.send(`ERROR:\nThis server doesn't have a config file in the database, please contact one of the Bot Owners if this issue continues`);
        }});

        //Created the embed
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
        this.client.db.findOne({ guildID: message.guild.id }, async (err, setting) => {
            if (err) console.log(err);
            if (!setting) { return message.channel.send(`ERROR:\n${err}`); }
            let oldchannel = await setting.logchannel;
            if(oldchannel === channel.id) return message.channel.send(`That already is the modlogs channel, To change it please select a new channel.`)
    setting.logchannel = channel.id;
    console.log(this.client.chalk.blue(`[Log Channel Database]`) + ` New Log Channel Added: ${channel.name} in ${message.guild.name}`)
    let eb = new Discord.RichEmbed()
    .setColor(util.colors.yellow)
    .setDescription(`${util.emojis.eload} Saving..`)
    let m = await message.channel.send(eb)
    setting.save()
    .catch(err => {
    embed.setColor(util.colors.red)
    embed.setDescription(`Save Failed. ${util.emojis.nemoji}`);
    m.edit(embed);
    console.log(err);
    })
    .then(() => {
    setTimeout(function () {
    embed.setColor(util.colors.green)
    embed.setTitle(`Log Channel`)
    embed.addField(`Before`, oldchannel ? `<#${oldchannel}>` : "None", true)
    embed.addField(`After`, `${channel ? channel : "None"}`, true)
    embed.setDescription(`Save Successful ${util.emojis.semoji}`)
    m.edit(embed).then(m => {
        channel.send(`**${message.author.tag}** set the modlogs channel for this channel!`)
    })
    }, 5000);
    });

});
}catch(e){
    this.client.error(this.client, message, e)
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
}
}