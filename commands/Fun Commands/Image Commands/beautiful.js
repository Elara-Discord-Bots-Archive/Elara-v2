const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const { Canvas } = require("canvas-constructor");
const { get } = require("snekfetch");
const fsn = require('fs-nextra');

module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "beautiful",
            memberName: "beautiful",
            aliases: [`admire`],
            examples: [],
            description: "Admires someone profile photo",
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
        try{
        let embed = new Discord.RichEmbed()
        .setColor(`RANDOM`)
        .setDescription(`Loading..`)
        message.channel.send(embed).then(msg => {
            get(user.displayAvatarURL.replace('.gif', '.png')).then(avatar => {
                fsn.readFile("./util/assets/admire.png").then(async plate => {
                    message.channel.startTyping(true)
                    let canvas = new Canvas(634, 675)
                        .setColor("#363940")
                        .addRect(0, 0, 634, 675)
                        .addImage(avatar.body, 423, 45, 168, 168)
                        .addImage(avatar.body, 426, 382, 168, 168)
                        .addImage(plate, 0, 0, 634, 675);
                    let image = await canvas.toBuffer();
                    let embed = new Discord.RichEmbed()
                    .attachFiles([new Discord.Attachment(image, "boop.png")])
                    .setImage("attachment://boop.png")
                    .setColor(`RANDOM`)
                    .setAuthor(user.tag, user.displayAvatarURL)
                    .setFooter(`Admired By: ${message.author.tag}`, message.author.displayAvatarURL)
                    message.channel.send(embed).then(async () => {
                        message.channel.stopTyping(true)
                    })
                    msg.delete();
                });
            });
        });
        } catch (e) {
            this.client.error(this.client, message, e)
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}