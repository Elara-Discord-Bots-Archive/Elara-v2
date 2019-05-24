const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const translate = require('@k3rn31p4nic/google-translate-api');
const {res} = require('../../../util/translate.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'translate',
            memberName: 'translate',
            aliases: [`ts`],
            examples: [`${client.commandPrefix}translate `],
            description: `Translate the text into the one you choose, Do \`${client.commandPrefix}translate list\` to see the available languages!`,
            group: 'info',
            args: [
                {
                    key: "to",
                    prompt: "What do you want it translated to?",
                    type: "string",
                    default: ""
                },
                {
                    key: "content",
                    prompt: "What do you want to translate?",
                    type: "string",
                    default: ""
                }
            ]
        })
    }
    async run(message, args) {
        if(args.to.toLowerCase() === "list"){
            let e = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(await res.map(c => `${c.name} (${c.value})`))
                .addField(`Note`, `Do \`${this.client.commandPrefix}${this.name} languageto text you want translated here\`\nExample: \`${this.client.commandPrefix}${this.name} fr Hello, how are you?\``)
            try{
            return message.author.send(e)
            }catch(e){
                return message.channel.send(`ERROR:\nI couldn't dm you the list!`)
            }
        }
        translate(args.content, {from: "auto", to: args.to }).then(res => {
            let e = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setColor(`RANDOM`)
            .setTimestamp()
            .setTitle(`Translation`)
            .setDescription(`From: ${res.from.language.iso.toUpperCase()}\nTo: ${args.to.toUpperCase()}`)
            .addField(`Before`, args.content)
            .addField(`After`, res.text)
            message.channel.send(e);
            // console.log(res)
        }).catch(err => {
            console.error(err);
        });
    }
}