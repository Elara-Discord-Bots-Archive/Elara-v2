const { Command } = require('../../../util/Commando'),
  util = require('../../../util/util.js');
Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "clearchannel",
            memberName: "clearchannel",
            aliases: [`cc`],
            examples: [`${client.commandPrefix}clearchannel logchannel`],
            description: "Clears the log/vclogs/reportlogs/actionlogs channel that you choose.",
            group: "admin",
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 60000
            },
            args: [
                {
                    key: "type",
                    prompt: "What do logchannel do you want to clear? [`logchannel/log`, `vclogs/vl`, `reportlogs/rl`, `actionlogs/al`]",
                    type: "string"
                }
            ]
        })
    }
    async run(message, {type}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_GUILD")) return;
try{
       this.client.db.findOne({guildID: message.guild.id}, async (err, db) => {
           if(!db){
               return message.channel.send(`There is no settings database for this server, please contact one of the Bot Admins.`);
           }else{
               let types = {
                   "log": "logchannel",
                   "al": "action log",
                   "vl": "VC log",
                   "rl": "reports log"
               }
               if(type.toLowerCase() === "logchannel" || type.toLowerCase() === "log"){
                if(db.logchannel !== 0){
                    db.logchannel= ""
                }else{
                    return message.channel.send(`There isn't a logchannel set!`)
                }
               }else
               if(type.toLowerCase() === "vclogs" || type.toLowerCase() === "vl"){
                if(db.vclogs !== 0){
                    db.vclogs = ""
                }else{
                    return message.channel.send(`There isn't a voice chat logs channel set!`)
                }
               }else
               if(type.toLowerCase() === "reportlogs" || type.toLowerCase() === "rl"){
                if(db.reportschannel !== 0){
                    db.reportschannel = ""
                }else{
                    return message.channel.send(`There isn't a reports channel set!`)
                }
               }else
               if(type.toLowerCase() === "actionlogs" || type.toLowerCase() === "al"){
                if(db.actionlog !== 0){
                    db.actionlog = ""
                }else{
                    return message.channel.send(`There isn't a action log channel set!`)
                }
               }else{
                   return message.channel.send(`You didn't choose one of these opinions to clear, [\`logchannel/log\`, \`vclogs/vl\`, \`reportlogs/rl\`, \`actionlogs/al\`]`)
               }
               db.save().catch(err => {this.client.error(this.client, message, err.stack)})
               await message.channel.send(`Okay, I cleared ${types[type] ? types[type] : type} channel.`)
           }
       })
}catch(e){
    message.channel.send(`ERROR:\n${e}`);
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
}
}
