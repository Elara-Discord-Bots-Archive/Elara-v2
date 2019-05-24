const { RichEmbed } = require('discord.js')
const { Command} = require('../../../util/Commando');
const fetch = require('node-fetch');

module.exports = class StrawpollCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'strawpoll',
            aliases: ['straw'],
            group: 'info',
            memberName: 'strawpoll',
            description: 'Strawpoll something. Recommended to use the replying with each argument method to allow spaces in the title',
            format: '\'Title Of Strawpoll\' OptionA OptionB OptionC...',
            details: 'Has a very specific syntax! Be sure to adapt the example!',
            examples: ['strawpoll \'Best RWBY girl?\' \'Pyrrha Nikos\' \'Ruby Rose\'', 'strawpoll \'Best coding language?\' JavaScript C# C++'],
            guildOnly: false,
            throttling: {
                usages: 2,
                duration: 3,
            },
            args: [
                {
                    key: 'title',
                    prompt: 'Title of the strawpoll',
                    type: 'string',
                },
                {
                    key: 'options',
                    prompt: 'What are the messages for the strawpoll (minimum is 2)? Send 1 option per message and end with `finish`',
                    type: 'string',
                    infinite: true,
                }
            ],
        });
    }

    async run(msg, { title, options }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if (options.length < 2) {
            return msg.reply('a poll needs to have at least 2 options to pick from');
        }
        try {
            startTyping(msg);
            const pollEmbed = new RichEmbed();
            const pollPost = await fetch('https://www.strawpoll.me/api/v2/polls', {
                body: JSON.stringify({
                    options,
                    title,
                    captcha: true,
                    dupcheck: 'normal',
                    multi: false,
                }),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });
            const strawpoll = await pollPost.json();

            pollEmbed
                .setColor(msg.guild ? msg.guild.me.displayHexColor : 'RANDOM')
                .setTitle(strawpoll.title)
                .setURL(`http://www.strawpoll.me/${strawpoll.id}`)
                .setImage(`http://www.strawpoll.me/images/poll-results/${strawpoll.id}.png`)
                .setDescription(`Options on this poll: ${strawpoll.options.map((val) => `\`${val}\``).join(', ')}`)
                .addField(`Links`, `[Vote Here!](http://www.strawpoll.me/${strawpoll.id})\n[Results](https://www.strawpoll.me/${strawpoll.id}/r)`)
 

            return msg.embed(pollEmbed);
        } catch (err) {
            return msg.reply('an error occurred creating the strawpoll');
        }
        } catch (e) {
            this.client.error(this.client, msg, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
}
