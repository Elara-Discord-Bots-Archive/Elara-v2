const {Command} = require('../../../util/Commando'),
Discord = require('discord.js');
module.exports = class NCommand extends Command {
         constructor(client) {
           super(client, {
             name: 'serverlist',
             memberName: 'serverlist',
             aliases: [],
             examples: [`${client.commandPrefix}serverlist`],
             description: 'Bot Owner Command',
             group: 'owner',
             ownerOnly: true
})
}
        async run(message) {
          this.client.stats(this.client, "cmd", null, null, null)
        try{
        let str = ''
        this.client.guilds.forEach(g => 
        str += `
        Name: ${g.name}
        ID: ${g.id}
        IconURL: ${g.iconURL ? g.iconURL : "None"}
        Owner: ${g.owner.user.tag} (${g.ownerID})
        Member Count: ${g.memberCount}
        Human Count: ${g.members.filter(c => !c.user.bot).size}
        Bot Count: ${g.members.filter(c => c.user.bot).size}
        Channel Count: ${g.channels.size}
        Emoji Count: ${g.emojis.size}
        Role Count: ${g.roles.size}
        Region: ${this.client.util.region[g.region]}
        Verification Level: ${this.client.util.verifLevels[g.verificationLevel]}
        Partnered: ${g.features.length === 0 ? 'No' : `Yes, features: ${g.features.map(feature => `\`${feature}\``).join(', ')}`}

        Member Statues:
        - ${g.members.filter(o => o.presence.status === 'online').size} Online
        - ${g.members.filter(i => i.presence.status === 'idle').size} Idle
        - ${g.members.filter(dnd => dnd.presence.status === 'dnd').size} DND
        - ${g.members.filter(off => off.presence.status === 'offline').size} Offline
        \n\n`)
        const request = require('superagent');
        let { body } = await request.post(`https://paste.lemonmc.com/api/json/create`)
        .send({
        data: `Server List\n\n${str}`,
        language: 'text',
        private: true,
        title: `${this.client.user.tag}`,
        expire: '2592000'
        }).catch(err => {
        message.channel.send(`ERROR:\nerr`)
        })
        let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
        message.say(link)
        } catch (e) {
        this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
}
}