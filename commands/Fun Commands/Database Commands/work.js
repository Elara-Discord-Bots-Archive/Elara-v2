const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'work',
             memberName: 'work',
             aliases: [],
             examples: [`${client.commandPrefix}work`],
             description: 'Work and get coins.',
             group: 'fun',
             guildOnly: true,
             throttling: {
                 usages: 1,
                 duration: 10
             }

})
}
        async run(message) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        this.client.dbcoins.findOne({guildID: message.guild.id, userID: message.author.id}, async (err, db) => {
                if(!db){
                return message.channel.send(`There is no db for you, Try again later.`)
            }else{
            let respond = [
                `You worked at Mcdonalds`, `You worked at the local shop`, `You worked at Amazon`, `You worked at Target`, `You worked for ${this.client.user}`,
                `You worked at Walmart`, `You worked at Subway`, `You worked as a pilot`, `You worked as a FireFighter`, `You worked as a Police Officer`,
                `You worked as a Doctor`, `You worked at Discord`, `You worked at the local coffee shop`, `You worked at the local pizza resturant`, `You worked for ${this.client.owners[0].tag}`,
                `You worked as a Time Traveler`,
                //``, ``, ``, ``,
                // ``, ``, ``, ``, ``,
            ];
            let random = Math.floor(Math.random() * respond.length);
            let moneyadd = Math.ceil(Math.random() * 500);
            let e = new Discord.RichEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setTitle(`Fetching Work..`)
            .setColor(`RANDOM`)
            let m = await message.channel.send(e)
            let eb = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setAuthor(message.author.tag, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`${respond[random]} and got ${moneyadd} coins`)
            await m.edit(eb)
            db.coins = db.coins + moneyadd
            db.save().catch(err => console.log(err))
}
        });
            } catch (e) {
                this.client.error(this.client, message, e)
                this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}
