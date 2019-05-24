const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const superagent = require('superagent');
const humanizeduration = require("humanize-duration");
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "npm",
            memberName: "npm",
            aliases: [],
            examples: [`${client.commandPrefix}npm <Package Name here>`],
            description: "Gets info on the npm package you search.",
            group: "docs",
            args: [
                {
                    key: 'content',
                    prompt: 'What npm package do you want me to retrieve?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let { body } = await superagent.get(`https://skimdb.npmjs.com/registry/${content.toLowerCase()}`)
        if (!body) return message.channel.send(`Nothing for that...`)
        let link = `https://www.npmjs.com/package/${content.toLowerCase()}`;
        let embed = new Discord.RichEmbed()
            .setThumbnail(`https://raw.githubusercontent.com/github/explore/6c6508f34230f0ac0d49e847a326429eefbfc030/topics/npm/npm.png`)
            .setColor(`RANDOM`)
            .setTitle(`Description`)
            .setDescription(body.description)
            .addField(`Author`, body.author.name)
            .addField(`Name`, body.name, true)
            .addField(`Download`, `[npm i ${body.name}](${link})`, true)
        if (body.homepage.length !== 0) { embed.addField(`Home Page`, body.homepage ? `[Click Here](${body.homepage})` : "None", true) }
        embed.addField(`Link`, `[Click Here](${link})`, true)
        embed.addField(`Repository`, `${((body.repository) ? `[Click Here](${body.repository.url.replace("git+", "").replace(".git", "").replace("git://", "https://").replace("git@github.com:", "https://github.com/").replace("ssh://git@", "https://")})` : "No Repository")}`, true)
        if (body.bugs.url.length !== 0) { embed.addField(`Bugs/Issues URL`, body.bugs.url ? `[Click Here](${body.bugs.url})` : "None", true) }
        embed.addField(`Latest`, body["dist-tags"].latest, true)
        embed.addField(`Last Updated`, humanizeduration(Date.now() - new Date(body.time[body["dist-tags"].latest]).getTime(), { round: true, largest: 2 }), true)
        embed.addField(`Key Words`, body.keywords.join('\n'), true)
        embed.addField(`Maintainers`, body.maintainers.map(m => m.name).join("\n"), true)

        message.channel.send(embed)
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}