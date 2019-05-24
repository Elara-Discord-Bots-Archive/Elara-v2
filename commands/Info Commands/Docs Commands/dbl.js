const {Command} = require('../../../util/Commando');
const {RichEmbed} = require('discord.js');
const fetch = require("snekfetch");
module.exports = class DBLCommand extends Command{
    constructor(client){
        super(client,{
            name: "dbl",
            memberName: "dbl",
            aliases: ["dbots"],
            group: "docs",
            examples: [`${client.commandPrefix}dbl @user/bot`],
            description: "Gets the information on the bot or user.",
            args: [
                {
                    key: 'bot',
                    prompt: 'What user or bot do you want to get the info on?.',
                    type: 'user'
                }
            ]
        })
    }
    async run(msg, {bot}) {
        this.client.stats(this.client, "cmd")
        try {
        if(bot.bot === true){
            let {body} = await new fetch("GET", `https://discordbots.org/api/bots/${bot.id}`)
                .set("Authorization", this.client.config.dbl);
            let owners = body.owners.map(owner => `<@${owner}>`).join('\n');
            let embed = new RichEmbed()
                .setTitle(`Short Description`)
                .setDescription(body.shortdesc)
                .addField(`Info`, `
                **User: **${bot} \`@${bot.tag}\` (${bot.id})`)
                .addField(`Site Info`, `
                **Prefix: **${body.prefix ? body.prefix : "N/A"}
                **Server Count: **${body.server_count ? body.server_count : "N/A"}
                **Shard Count: **${body.shards.length ? body.shards.length : "N/A"}
                **Monthly Upvotes: **${body.monthlyPoints ? body.monthlyPoints : "N/A"}
                **Total Upvotes: **${body.points ? body.points : "N/A"}
                **Library: **${body.lib ? body.lib : "N/A"}
                **Certified Bot: **${body.certifiedBot ? "Yes": "No"}
                **Tags: **${body.tags.length !== 0 ? body.tags.join(', ') : "N/A"}
                **Owners: **${owners ? owners : "None"}
                `, true)
                .addField(`Links`, `
                [DBL](https://discordbots.org/bot/${body.id})
                [Invite](${body.invite})
                ${body.support ? `[Support Server](https://discord.gg/${body.support})` : ''}
                ${body.github ? `[Github](${body.github})` : ''}
                ${body.website ? `[Website](${body.website})` : ''}
                `, true)
                .setColor(`RANDOM`)
                .setThumbnail(bot.displayAvatarURL)
                .setAuthor(bot.tag, bot.displayAvatarURL)
            msg.say(embed)
        } else{
                let { body } = await new fetch("GET", `https://discordbots.org/api/users/${bot.id}`).set("Authorization", this.client.config.dbl);
                    let e = new RichEmbed()
                        .setColor(`RANDOM`)
                        .setAuthor(bot.tag, bot.displayAvatarURL)
                        .setThumbnail(bot.displayAvatarURL)
                        .setTimestamp()
                        .setTitle(`Information on ${bot.tag}`)
                        .addField(`User Info`, `Name: ${body.username}\nID: ${body.id}\nDiscriminator: #${body.discriminator}\nAvatar: [Click Here](${bot.displayAvatarURL})`)
                        .addField(`Website Info`, `Website Admin: ${body.admin ? "Yes" : "No"}\n Website Moderator: ${body.webMod ? "Yes" : "No"}\nDiscord Moderator: ${body.mod ? "Yes" : "No"}\nCertified Developer: ${body.certifiedDev ? "Yes" : "No"}\nSupporter: ${body.supporter ? "Yes" : "No"}`)
                    if (body.banner !== undefined) { e.setImage(body.banner) }
                    msg.say(e)
               
            }
        } catch (e) {
            if (!e.stack.includes("Error: 404 Not Found")){
                this.client.error(this.client, msg, e);
                this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
            }
            msg.say(`${bot.tag} isn't on \`discordbots.org\``)
        }
    }
}
