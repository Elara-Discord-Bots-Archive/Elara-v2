const { Command } = require('../../../util/Commando');
module.exports = class DmCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'dm',
            group: 'mod',
            memberName: 'dm',
            description: 'Sends a message to the user you mention.',
            aliases: ["pm"],
            examples: [`${client.commandPrefix}dm @User/userid/username Hi there!`],
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: 'Which user do you want to send the DM to?',
                    type: 'user'
                },
                {
                    key: 'content',
                    prompt: 'What would you like the content of the message to be?',
                    type: 'string'
                }
            ]
        });
    }

    async  run(msg, { user, content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, msg, "MANAGE_MESSAGES")) return;
        try{
        if (this.client.isOwner(user.id)) return msg.say(`I ain't dming one of my bot owners! Are you crazy?`)
        if (user === this.client.user) return msg.say(`${this.client.util.emojis.nemoji} I can't dm myself :face_palm:`)
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setDescription(content)
            .setAuthor(`Message from ${msg.guild.name}`, msg.guild.iconURL)
            .setTimestamp()

        user.send(embed).then(m => {
            msg.react(this.client.util.emojis.sreact)
            msg.say(`${this.client.util.emojis.semoji} ${msg.author} Sent the message to ${user.tag}`).then(m => { m.delete(10000).catch() })
        })
        .catch(error => {
            msg.react(this.client.util.emojis.nreact)
            msg.say(`${this.client.util.emojis.nemoji} I can't send ${user.tag} a dm, The person has blocked me or doesn't allow dms from others.`)
        })
    }catch(e){
        this.client.error(this.client, message, e);
        this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
    }
    }
};
