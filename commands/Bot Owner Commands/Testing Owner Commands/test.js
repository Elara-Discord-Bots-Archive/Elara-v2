const {Command} = require('../../../util/Commando');
const Discord = require('discord.js');
module.exports = class NCommand extends Command {
      constructor(client) {
      super(client, {
      name: 'test',
      memberName: 'test',
      aliases: [],
      examples: [`${client.commandPrefix}test`],
      description: 'N/A',
      group: 'owner',
      ownerOnly: true
})
}
        async run(message) {
      let e = new Discord.RichEmbed()
      .setColor(`RANDOM`)
      .setDescription(`Testing?`)
      message.channel.send(e)
};
}