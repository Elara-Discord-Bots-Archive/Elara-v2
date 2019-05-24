const { Command } = require('../../../util/Commando'),
  util = require('../../../util/util.js');
Discord = require('discord.js');

module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reportslog",
            memberName: "reportslog",
            aliases: [`rl`],
            examples: [`${client.commandPrefix}reportslog #channel`],
            description: "Sets the channel for the reports to be logged in.",
            group: "admin",
            guildOnly: true,
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
        if (this.client.perms(this.client, message, "MANAGE_GUILD")) return;
        try{
        let bot = this.client.user;
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
            if (!setting) { return message.channel.send("Error"); }
            let oldchannel = await setting.reportschannel;
            if(oldchannel === channel.id) return message.channel.send(`That already is the modlogs channel, To change it please select a new channel.`)
    setting.reportschannel = channel.id;
    console.log(this.client.chalk.yellow(`[Report Logs Database]`) + ` New Report Logs Added: ${channel.name} in ${message.guild.name}`)
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
    embed.setTitle(`Reports Log Channel`)
    embed.addField(`Before`, oldchannel ? `<#${oldchannel}>` : "None", true)
    embed.addField(`After`, `${channel}`, true)
    embed.setDescription(`Save Successful ${util.emojis.semoji}`)
    m.edit(embed);
    }, 5000);
    });

});
}catch(e){
    this.client.error(this.client, message, e)
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
}
}