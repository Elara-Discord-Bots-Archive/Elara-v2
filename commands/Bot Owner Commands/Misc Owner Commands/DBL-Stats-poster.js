const {Command} = require('../../../util/Commando');
const Discord = require('discord.js');
const fetch = require('snekfetch');
module.exports = class NCommand extends Command {
      constructor(client) {
      super(client, {
      name: 'dblupdate',
      memberName: 'dblupdate',
      aliases: [`dblu`],
      examples: [`${client.commandPrefix}dblupdate`],
      description: 'Posts the current stats to DBL',
      group: 'owner',
      ownerOnly: true
})
}
        async run(message) {
            let elara = this.client.users.get("455166272339181589");
            let e = new Discord.RichEmbed()
            .setAuthor(`${elara.tag}`, elara.displayAvatarURL)
            .setColor(message.member.displayColor ? message.member.displayColor : "RANDOM");
            await new fetch("POST", `https://discordbots.org/api/bots/455166272339181589/stats`).set("Authorization", process.env.DBL).send({ server_count: this.client.guilds.size}).then(() => true);
            e.setDescription('Done');
            return message.say(e)
};
}
