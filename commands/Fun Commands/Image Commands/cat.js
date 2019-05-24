const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'cat',
             memberName: 'cat',
             aliases: [],
             examples: [`${client.commandPrefix}cat`],
             description: 'Shows a adorable cat or kitten photo <3',
             group: 'image'
})
}
        async run(message) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
            let cats = this.client.photos.cats;
            let result = Math.floor((Math.random() * cats.length));
            let embed = new Discord.RichEmbed()
                .setColor("#FF000")
                .setDescription(`${this.client.util.emojis.eload} Loading...`)
            let msg = await message.channel.send(embed)


            let e = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setDescription(`Here's a Photo of a Cat <a:CatLove:494713523436519434>\nLink to Photo [Click Here](${cats[result]})`)
            .setImage(cats[result])
            .setFooter(`Cat Photo ${result}/${cats.length}`)
            msg.edit(e)
} catch (e) {
    this.client.error(this.client, message, e);
this.client.logger(this.client, message.guild, e.stack, message, message.channel)
}
}
}