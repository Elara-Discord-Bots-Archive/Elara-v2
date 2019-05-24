const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const { Canvas } = require("canvas-constructor");
const { get } = require("snekfetch");
const fsn = require('fs-nextra');

module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "wanted",
            memberName: "wanted",
            aliases: [],
            examples: [],
            description: "Makes a wanted photo of someones profile photo",
            group: "image",
            args: [
                {
                    key: 'user',
                    prompt: 'What user do you want to make beautiful? xd',
                    type: 'user'
                }
            ]
        })
    }
    async run(message, { user }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try {
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setDescription(`Loading..`)
            message.channel.send(embed).then(async msg => {
                
                const png = user.displayAvatarURL.replace(/\.(gif|jpg|png|jpeg)\?size=2048/g, '.png?size=256');
                const { body } = await get(png)
                    fsn.readFile("./util/assets/wanted.jpg").then(async plate => {
                        message.channel.startTyping(true)
                        let canvas = new Canvas(400, 562)
                            .setColor('#000000')
                            .addRect(0, 0, 400, 562)
                            .addImage(plate, 0, 0, 400, 562)
                            .addImage(body, 86, 178, 228, 228)
                        let image = await canvas.toBuffer();
                        let embed = new Discord.RichEmbed()
                            .attachFiles([new Discord.Attachment(image, "boop.png")])
                            .setImage("attachment://boop.png")
                            .setColor(`RANDOM`)
                            .setAuthor(user.tag, user.displayAvatarURL)
                            .setFooter(`Wanted By: ${message.author.tag}`, message.author.displayAvatarURL)
                        message.channel.send(embed).then(async () => {
                            message.channel.stopTyping(true)
                        })
                        msg.delete();
                    });
                });
        
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}