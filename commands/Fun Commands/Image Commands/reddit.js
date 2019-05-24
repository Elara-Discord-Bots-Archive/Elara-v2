const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "reddit",
            memberName: "reddit",
            aliases: ["rd"],
            examples: [`${client.commandPrefix}reddit Pug`],
            description: "Gives you a random reddit post from the thing you search for.",
            group: "image",
            args: [
                {
                    key: 'content',
                    prompt: 'What do you want to search for?',
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(content.includes('meme') || content.includes('porn')){
            if(!msg.channel.nsfw)return msg.channel.send(`You can't search that in this channel.`)
        }
        if (content === "cats") content = "cat"
        const data = await fetch(`https://www.reddit.com/r/${content}/random.json`)
            .then(response => response.json())
            .then(body => {
                if (body.error) return msg.say(`Error with that photo/post`);
                return body[0].data.children[0].data;
            })
            .catch(() => { return console.error; });
        if (!data.url) return msg.say(`Nothing, please try again.`)
        if (data.over_18 && !msg.channel.nsfw) {
            if (msg.channel.type === "dm") return msg.say(`I can't post a NSFW Image in dms.`)
            msg.say('I cant post a NSFW image in this channel unless you mark it as NSFW!');
        } else {
            let embed = new Discord.RichEmbed()
                .setAuthor(`Photos from Reddit.`, `http://i.imgur.com/sdO8tAw.png`)
                .setColor(`RANDOM`)
                .setDescription(`Here is your **${content}**\nLink to photo [Click Here](${data.url})`)
                .setImage(data.url)
                .setFooter(`Requested By ${msg.author.tag}`, msg.author.displayAvatarURL)
            msg.embed(embed)
        }
} catch (e) {
    this.client.error(this.client, msg, e);
this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
}
    }
}