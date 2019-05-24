const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'test3',
             memberName: 'test3',
             aliases: [],
             ownerOnly: true,
             examples: [`${client.commandPrefix}test3`],
             description: '[Testing 3 Command]',
             group: 'owner'
})
}
        async run(message) {
        
}
}