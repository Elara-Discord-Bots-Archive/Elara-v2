const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const superagent = require('superagent');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "roblox",
            memberName: "roblox",
            aliases: [`robloxprofile`, "rblx"],
            examples: [`${client.commandPrefix}roblox @user/userid`],
            description: "Gets their roblox Profile if they are verified with the discord bot RoVer",
            group: "info",
            args: [
                {
                    key: 'user',
                    prompt: 'What member do you want me to check out?',
                    type: 'user',
                    default: msg => msg.author
                }
            ]
        })
    }
    async run(msg, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
    if(user.bot) return msg.channel.send(`Bot's can't have roblox accounts.`)
       try{
        let {body} = await superagent
        .get(`https://verify.eryn.io/api/user/${user.id}`).catch(err => {
            let e = new Discord.RichEmbed()
                .setColor(`#FF0000`)
                .setTitle(`ERROR`)
                .setDescription(`Nothing for that user\nWant to add your account? Verify [here](https://verify.eryn.io/)`)
          return  msg.say(e)
        });

        if(body.status === "error") return;
        this.db = body
        if(body.status === "ok"){
            let {body} = await superagent .get(`https://api.roblox.com/users/${this.db.robloxId}`)
            if (body.status === "error") return;
            let e = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(user.tag, user.displayAvatarURL)
            .setTimestamp()
            .setTitle(`Roblox Info`)
            .addField(`Username`, body.Username, true)
            .addField(`Roblox ID`, body.Id, true)
            .setThumbnail(`https://assetgame.roblox.com/Thumbs/Avatar.ashx?username=${encodeURIComponent(body.Username)}`)
            .addField(`Profile URL`, `[Click Here](https://www.roblox.com/users/${body.Id}/profile)`, true)
            .setFooter(`Want to search for someone elses roblox info? Do ${this.client.commandPrefix}roblox @user/userid`, this.client.user.displayAvatarURL)
            msg.channel.send(e)
        }else {
            let e = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setTitle(`ERROR`)
            .setDescription(`Nothing for that user\nWant to add your account? Verify [here](https://verify.eryn.io/)`)
            msg.say(e)
        }
    } catch (e) {
    this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
    }
    }
}
