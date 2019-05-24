const { Command } = require('../../../util/Commando'),
  util = require('../../../util/util.js');
Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "toggle",
            memberName: "toggle",
            aliases: [`tog`],
            examples: [`${client.commandPrefix}toggle <module> <enable/disable>`],
            description: "Enables or disables a certain module.",
            group: "admin",
            args: [
                {
                    key: "module",
                    prompt: "What module do you want to enable or disable? [`joins`, `mod`, `server`, `messages`, `user`]",
                    type: "string"
                },
                {
                    key: "type",
                    prompt: "Do you want to `enable` or `disable` that module?.",
                    type: "string"
                }
            ]
        })
    }
    async run(message, {module, type}) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_GUILD")) return;
try{       
this.client.db.findOne({guildID: message.guild.id}, async (err, db) => {
    if(!db){
        return message.channel.send(`There is no database for this server!`);
    }else{
        if(type.toLowerCase() === "enable" || type.toLowerCase() === "en" || type.toLowerCase() === "true"){
        if(module.toLowerCase() === "joins"){
            db.toggles.joins = true
        }else
        if(module.toLowerCase() === "server"){
            db.toggles.server = true
        }else
        if(module.toLowerCase() === "mod"){
            db.toggles.mod = true
        }else
        if(module.toLowerCase() === "user"){
            db.toggles.user = true
        }else
        if(module.toLowerCase() === "messages"){
            db.toggles.messages = true
        }else {
            return message.channel.send("You didn't choose a module! [`joins`, `server`, `messages`, `mod`, `user`]")
        }
        db.save().catch(err => console.log(err.stack))
        message.channel.send(`Ok I have enabled ${module} module.`)
        }else
        if(type.toLowerCase() === "disable" || type.toLowerCase() === "dis" || type.toLowerCase() === "false"){
            if(module.toLowerCase() === "joins"){
                db.toggles.joins = false
            }else
            if(module.toLowerCase() === "server"){
                db.toggles.server = false
            }else
            if(module.toLowerCase() === "mod"){
                db.toggles.mod = false
            }else
            if(module.toLowerCase() === "user"){
                db.toggles.user = false
            }else
            if(module.toLowerCase() === "messages"){
                db.toggles.messages = false
            }else {
                return message.channel.send("You didn't choose a module! [`joins`, `server`, `messages`, `mod`, `user`]")
            }
            db.save().catch(err => console.log(err.stack))
            message.channel.send(`Ok I have disabled ${module} module.`)
        }else{
            return message.channel.send(`You didn't choose \`enable/en/true\` or \`disable/dis/false\` to disable or enable that module!`)
        }
    }
})


}catch(e){
    this.client.error(this.client, message, e)
    this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
}
}
