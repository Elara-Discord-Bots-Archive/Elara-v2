const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "discord",
            memberName: "discord",
            aliases: [],
            examples: [`${client.commandPrefix}discord`],
            description: "Gives you a discord invite for the discord.",
            group: "server",
            guildOnly: true,
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if (message.guild.id === "273525914187333637") {
            let embed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setAuthor(`Invite For: ${message.guild.name}`, message.guild.iconURL)
                .setDescription(`https://discord.gg/tAZgvdd`)
            return message.channel.send(embed)
        }
        if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES" && "EMBED_LINKS" && "READ_MESSAGES" && "CREATE_INSTANT_INVITE")) {
            message.say(`ERROR\n I can't create a discord invite in this channel!`)
            
        } else {
        try{
        let creator = message.author;
        let botembed = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`<a:Dots:426956230582599690> Creating The Invite.`)
            .setTimestamp()
        message.delete(15000).catch()
        message.channel.send(botembed).then(message => {
            message.channel.createInvite({maxAge: 0}, [`Created for: ${creator.tag} (${creator.id})`]).then(i => {
                botembed.setColor("RANDOM")
                botembed.setAuthor(message.guild.name, message.guild.iconURL)
                botembed.setDescription(`https://discord.gg/${i.code}`)
                botembed.setFooter(this.client.user.username, this.client.user.displayAvatarURL)
                botembed.setTimestamp()
                message.edit(botembed).then(message => {
                message.delete(15000).catch()
                })

            })
        })
        }catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
    
    }
}