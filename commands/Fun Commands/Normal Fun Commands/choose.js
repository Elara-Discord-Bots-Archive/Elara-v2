const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'choose',
             memberName: 'choose',
             aliases: [],
             examples: [`${client.commandPrefix}choose <option 1> <option 2> etc`],
             description: 'Chooses from what you provide',
             group: 'fun',
             throttling: {
            usages: 1,
            duration: 5
            },
             args: [
                 {
                     key: 'options',
                     prompt: 'Please provide options to choose from. ',
                     type: 'string',
                     infinite: true,
                 }
              ]
})
}
        async run(message, {options}) {
            this.client.stats(this.client, "cmd", null, null, null)
            try{
        let result = Math.floor(Math.random() * options.length);
        message.channel.send(options[result])
            } catch (e) {
                this.client.error(this.client, message, e);
                this.client.logger(this.client, message.guild, e.stack, message, message.channel)
            }
}
}
