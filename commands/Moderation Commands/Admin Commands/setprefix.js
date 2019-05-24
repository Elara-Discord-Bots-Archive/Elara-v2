const { Command } = require('../../../util/Commando'),
  util = require('../../../util/util.js');
Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "setprefix",
            memberName: "setprefix",
            aliases: [`sp`],
            examples: [`${client.commandPrefix}setprefix new prefix here`],
            description: "Sets the prefix for the server..",
            group: "admin",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },
            args: [
                {
                    key: "prefix",
                    prompt: "What do you want the prefix to be?",
                    type: "string"
                }
            ]
        })
    }
    async run(message, {prefix}) {
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
            let oldprefix = await setting.prefix
            if(oldprefix === prefix) return message.channel.send(`That already is already the prefix.`)
    if(prefix.toLowerCase() === "clear"){
        prefix = this.client.commandPrefix
    }
    if(prefix.toLowerCase() === "default"){
        prefix = this.client.commandPrefix
    }
    setting.prefix = prefix;
    message.guild._commandPrefix = prefix
        console.log(this.client.chalk.red(`[Prefix Database]`) + ` New Prefix Added: ${prefix} in ${message.guild.name}`)
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
    message.guild._commandPrefix = setting.prefix;
    embed.setColor(util.colors.green)
    embed.setTitle(`Prefix`)
    embed.addField(`Before`, oldprefix ? oldprefix : "None", true)
    embed.addField(`After`, setting.prefix ? setting.prefix : 'None', true)
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
