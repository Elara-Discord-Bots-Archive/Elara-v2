const { Command } = require('../../../util/Commando'),
    keys = require('../../../util/config.js'),
    Discord = require('discord.js');
const { Client } = require('imdb-api');
const cli = new Client({ apiKey: process.env.IMDB });
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "movie",
            memberName: "movie",
            aliases: [`imdb`],
            examples: [`${client.commandPrefix}movie Avengers`],
            description: "Gives you information about the show/movie that you provide",
            group: "info",
            args: [
                {
                    key: "movie",
                    prompt: "What show/movie do you want the info of?",
                    type: "string"
                }
            ]
        })
    }
    async run(msg, { movie }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        cli.search({ 'name': movie }).then((search) => {
            let replies = search.results;
            let result = Math.floor((Math.random() * replies.length));
            let s1 = replies[result];
            let embed = new Discord.RichEmbed()
                .setTitle(s1.title)
                .setColor(`RANDOM`)
                .setTimestamp()
                .setThumbnail("https://pmcdeadline2.files.wordpress.com/2015/10/imdb.jpg?w=446&h=299&crop=1")
                .setURL(`https://www.imdb.com/title/${s1.imdbid}`)
                .addField(`Name`, s1.name, true)
                .addField(`Type`, s1.type.toUpperCase(), true)
                .addField(`Year`, s1.year, true)
                .addField(`Link`, `[Click Here](https://www.imdb.com/title/${s1.imdbid})`, true)
            if (s1.poster.length > 5) {
                embed.setImage(s1.poster)
                embed.addField(`Poster Link`, `[Click Here](${s1.poster})`, true)
            }
            msg.say(embed)
        });
        } catch (e) {
            this.client.error(this.client, msg, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
}
