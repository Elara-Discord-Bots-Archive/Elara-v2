const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const tzdb = JSON.parse(require("fs").readFileSync('./util/breed.json'));
const superagent = require('superagent');

module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "breed",
            memberName: "breed",
            aliases: [],
            examples: [`${client.commandPrefix}breed <pug/dog breed here>`],
            description: `Gives you a photo of the dog breed you choose, do \`${client.commandPrefix}breed list\` to see the full list`,
            group: "image",
            args: [
                {
                    key: 'content',
                    prompt: `What Breed do you want the photo of?..\nIf you ain't sure on what breeds there are do \`${client.commandPrefix}breed list\``,
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        msg.channel.startTyping(true)
        const argstotal = content;
        if (content.length > 1) {
            if (argstotal === "list")
                return await msg.say(`Sent the Information in your dms.`).then(msg.direct({
                    embed: {
                        title: "Here is a list of dog breeds that are available.",
                        description: `To use them, simply do \`\`${this.client.commandPrefix}breed <breed name here>.\`\``,
                        fields: provideList(tzdb),
                        timestamp: new Date(),
                        color: 0x02FFDD
                    }
                }));
           try{ const { body } = await superagent
            .get(`https://dog.ceo/api/breed/${argstotal.toLowerCase()}/images/random`)
            let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setImage(body.message) 
            .setTitle(`Here is your ${argstotal.toUpperCase()} Photo`)
            msg.say(embed)
            }catch(e) {
                msg.say(`Nothing for that.`)
            }
        }

        function provideList(arr) {
            const buf = arr.map(x => x.value);
            let strr = [];
            for (let i = 0; i < 2; i++) {
                strr[strr.length] = {
                    name: "Continued",
                    value: `\`\`\`${buf.splice(0, 70).join("\n")}\`\`\``
                };
            }
            return strr;
        }
    await msg.channel.stopTyping()
} catch (e) {
this.client.error(this.client, msg, e);
this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
}
    }
}