const { Command } = require('../../../util/Commando'),
Discord = require('discord.js'),
config = require('../../../util/config.js'),
search = require('youtube-search');
module.exports = class YtSearchCommand extends Command {
constructor(client){
    super(client, {
        name: "youtube",
        group: "info",
        aliases: ['yt'],
        description: "Searchs for a youtube video",
        memberName: "youtube",
        examples: [`${client.commandPrefix}yt <Channel Name or Video Search Name here>`],
         args: [
        {
            key: 'content',
            prompt: 'Which video do you want to find?',
            type: 'string'
        }
    ]
    })
}
async run (message, {content}) {
    this.client.stats(this.client, "cmd", null, null, null)
    try{
    let client = this.client;
    let args = content;
    if (args[0]) {
        var opts = {
            maxResults: 10,
            key: config.youtube,
            type: 'video'
        };
        let nm = content
        message.react('476629550797684736')
        search(nm, opts, function (err, results) {
            let random = Math.floor((Math.random() * results.length));
            if (err) {
                this.client.error(this.client, message, err);
                console.log(err);
            }
            const embed2 = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(client.user.username, client.user.avatarURL)
                .setTitle(results[random].title)
                .setDescription(`${results[random].description}`)
                .addField(`Link`, `${results[random].link}`)
                .setImage(results[random].thumbnails.high.url)
                .setTimestamp(results[random].publishedAt)
                .setFooter(`[YouTube] Search ${random}/10`, `http://www.creditlenders.info/wp-content/uploads/youtube-gaming-or-something-like-it-endgame-viable-youtube-gaming-logo.png`)
            message.say(embed2);
        });
    } else {
        message.react('482868924573155349')
        let embed = new Discord.RichEmbed()
            .setColor(`#FF0000`)
            .setTitle("Hm?")
            .setDescription(`What video do you want to search for? ${client.commandPrefix}yt (query)`)
        message.say(embed).catch(console.error);
    }
    } catch (e) {
        this.client.error(this.client, message, e);
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
}
}