const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
const garfield = require('garfield');
const sa = require('superagent');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'garfield',
             memberName: 'garfield',
             aliases: [],
             examples: [`${client.commandPrefix}garfield`],
             description: 'Posts a random garfield comic',
             group: 'image'
})
}
        async run(message) {
          this.client.stats(this.client, "cmd", null, null, null)
        let url = await garfield.random()
        if(!url) return message.channel.send(`ERROR Fetching a garfield comic, Try again.`);
        try{
        this.body = await sa.get(url)
        }catch(e){
          return message.channel.send(`ERROR Fetching a garfield comic, Try again.`)
        }
           let e = new Discord.RichEmbed()
           .setColor(`RANDOM`)
           .setFooter(this.client.user.tag, this.client.user.displayAvatarURL)
           .setTimestamp()
           .setDescription(`Here is you're Garfield Comic`)
           .setImage(this.body.request.url)
           message.channel.send(e)
}
}