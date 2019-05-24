const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const snek = require('superagent');
const toMarkdown = require('to-markdown');
const mdnLink = 'https://developer.mozilla.org';
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "mdn",
            memberName: "mdn",
            aliases: [],
            examples: [`${client.commandPrefix}mdn <Search Query>`],
            description: "Searches the term on MDN",
            group: "docs",
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want to search for?',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        const query = content.replace(/#/g, '.prototype.');
        try {
            const { body } = await snek
                .get('https://mdn.topkek.pw/search')
                .query({ q: query });

            if (!body.URL || !body.Title || !body.Summary) message.reply('Could not find any results.');

            const embed = new Discord.RichEmbed()
                .setColor(0x066FAD)
                .setAuthor('MDN', 'https://developer.mozilla.org/static/img/opengraph-logo.72382e605ce3.png')
                .setURL(`${mdnLink}${body.URL}`)
                .setTitle(body.Title)
                .setDescription(toMarkdown(body.Summary, {
                    converters: [{
                        filter: 'a',
                        replacement: (text, node) => `[${text}](${mdnLink}${node.href})`
                    }]
                }));
            return message.channel.send(embed);
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
        
    }
}