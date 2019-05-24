const { Command } = require('../../../util/Commando');

module.exports = class CleanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pt',
            aliases: [`prunetext`],
            group: 'mod',
            memberName: 'pt',
            clientPermissions: ["MANAGE_MESSAGES"],
            description: 'Deletes text only, *useful for photos channels.*',
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 3
            },
        });
    }
    async run(msg) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, msg, "MANAGE_MESSAGES")) return;
        try{
        msg.delete(100).catch()
        const messagesToDelete = await msg.channel.fetchMessages({ limit: 100 }).catch(err => null);
        let msgs = messagesToDelete.filter(message => message.content && message.attachments.map(c => c).length < 1 && message.pinned === false && !message.embeds.size !== 0)
        msg.channel.bulkDelete(msgs.array().reverse()).catch(err => null)

        return null;

        
        } catch (e) {
        this.client.error(this.client, msg, e)
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
        }
    }
};
