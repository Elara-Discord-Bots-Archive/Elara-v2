const {Command} = require('../../../util/Commando');
const { RichEmbed } = require('discord.js');
const docs = require('discord.js-docs');
module.exports = class DBLCommand extends Command {
    constructor(client) {
        super(client, {
            name: "docs",
            memberName: "docs",
            aliases: ["d.js"],
            group: "docs",
            examples: [`${client.commandPrefix}docs Client`, `${client.commandPrefix}docs CommandoClient commando`, `${client.commandPrefix}docs <Search query here> <Docs Type>`],
            description: "Gets the information from the Discord.js Docs",
            ownerOnly: false,
            guarded: false,
            guildOnly: false,
            args: [
                {
                    key: "search",
                    prompt: "What do you want to search in the Discord.js docs?",
                    type: "string"
                },
                {
                    key: "project",
                    prompt: "What project, `main`, `commando`, `rpc`",
                    type: "string",
                    default: "main"
                },
            ]
        })
    }
    async run(message, { search, project }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try {
            if (project.toLowerCase() === "d.js" || project.toLowerCase() === "regular" || project.toLowerCase() === "main") project = "main";
            if (project.toLowerCase() === "cmdo" || project.toLowerCase() === "commando" || project.toLowerCase() === "d.js-commando") project = "commando";
            const doc = await docs.fetch(project, 'master', { force: true })
            let test = await doc.resolveEmbed(search)
            return message.channel.send({
                embed: {
                    color: test.color ? test.color : 0xFF000,
                    title: test.title,
                    thumbnail: {
                        url: test.author.icon_url
                    },
                    author: {
                        name: test.author.name,
                        url: test.author.url,
                        icon_url: test.author.icon_url
                    },
                    description: test.description,
                    url: test.url,
                    fields: test.fields 
                }
            })
        } catch (e) {
            if(!e.stack.includes("TypeError: Cannot read property 'resolveEmbed' of null")){
                this.client.error(this.client, message, e);
                this.client.logger(this.client, message.guild, e.stack, message, message.channel)
                
            }
            message.say(`Nothing for that.`)
        }
    }
}