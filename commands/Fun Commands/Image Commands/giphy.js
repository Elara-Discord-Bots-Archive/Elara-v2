const { Command } = require('../../../util/Commando'),
    { giphy } = require('../../../util/config.js'),
    superagent = require("superagent"),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "gif",
            memberName: "gif",
            aliases: ["giphy"],
            examples: [`${client.commandPrefix}gif <Search here>`],
            description: "Searchs for a gif on Giphy",
            group: "image",
            args: [
                {
                    key: 'content',
                    prompt: 'Please provide a search for the gif!',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        const api = giphy;
        const userURL = message.author.displayAvatarURL;
        const usernameid = message.author.username;
        // ==========================================================================================================================================
        let { body } = await superagent
            .get(`https://api.giphy.com/v1/gifs/random?api_key=${api}&tag=${encodeURIComponent(content)}`, { json: true });
        // ==========================================================================================================================================
        const brokenembed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(`API is Broke <a:Dots:426956230582599690> Please Contact ${this.client.owners}`)
        if (!body) return message.channel.send(brokenembed).then(console.log(`ERROR: [Giphy API is Currently Broke]`));
        // ==========================================================================================================================================
        const nothingembed = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setDescription(`Sorry but nothing for **\`${encodeURIComponent(content)}\`**`)
            .setFooter("Command Ran By: " + usernameid, userURL)
        if (!body.data.image_url) return message.channel.send(nothingembed);
        // ==========================================================================================================================================
        const embed = new Discord.RichEmbed()
            .setColor("#FF000")
            .setDescription("<a:Dots:426956230582599690> Loading the GIF, Please Wait.....")
        message.channel.send(embed).then(message => {
            embed.setTitle("GIF's Provided By: GIPHY")
            embed.setColor("RANDOM")
            embed.setDescription(`Here is your **\`${encodeURIComponent(content)}\`** GIF \n Click [here](${body.data.image_url}) for the direct URL`, { json: true })
            embed.setImage(body.data.image_url)
            embed.setFooter("Command Ran By: " + usernameid, userURL)
            message.edit(embed)
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}