const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const spc = require("spacetime"),
    tzdb = JSON.parse(require("fs").readFileSync('./util/tz.json'));

module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "time",
            memberName: "time",
            aliases: ["times"],
            examples: [`${client.commandPrefix}time <location here>`],
            description: "Gives you the time.",
            group: "info",
            args: [
                {
                    key: 'content',
                    prompt: `What Place do you want the time of?..\nIf you ain't sure on what timezones there are do \`${client.commandPrefix}time list\``,
                    type: 'string'
                }
            ]
        })
    }
    async run(msg, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        if(content.toLowerCase() === "g" || content.toLowerCase() === "deeter" || content.toLowerCase() === "deeterplays"){
            const curenttime = spc.now(tzdb.find(x => x.name === "Los Angeles").value);
            let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setTitle(`Current time for DeeterPlays (${curenttime.format('nice-day').toString()})`)
           return await msg.say(embed)
        }else
        if(content.toLowerCase() === "v" || content.toLowerCase() === "val"){
            const curenttime = spc.now(tzdb.find(x => x.name === "London").value);
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setTitle(`Current Time For VAL (${curenttime.format('nice-day').toString()})`)
            return await msg.say(embed)
        }else
            if (content.length > 1) {
                const argstotal = content;
                if (argstotal === "list")
                    return await msg.say(`Sent the Information in your dms.`).then(
                        
                        msg.direct({
                        embed: {
                            title: "Here is a list of timezones that are available.",
                            description: `To use them, simply do \`\`${this.client.commandPrefix}time <timezone>.\`\``,
                            fields: provideList(tzdb),
                            color: 0xFF000,
                            timestamp: new Date()
                        }
                    }).catch(o_O => {})
                    );

                if (!tzdb.some(x => x.name === argstotal))
                    return await msg.say("I couldn't find any place like this. Are you sure you weren't lost?");

                const curenttime = spc.now(tzdb.find(x => x.name === argstotal).value);
                return await msg.say({
                    embed: {
                        title: `Current time (${argstotal}):`,
                        description: curenttime.format('nice-day').toString(),
                        color: 0xFF000,
                        fields: [{
                            name: "Need help?",
                            value: `Do \`\`${this.client.commandPrefix}time list\`\` to get a list of available timezones!`
                        }],
                        timestamp: new Date()
                    }
                });
            }

        function provideList(arr) {
            const buf = arr.map(x => x.name);
            let strr = [];
            for (let i = 0; i < 6; i++) {
                strr[strr.length] = {
                    name: "Continued",
                    value: `\`\`\`${buf.splice(0, 80).join("\n")}\`\`\``
                };
            }
            return strr;
        }
        } catch (e) {
            this.client.error(this.client, msg, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
}
