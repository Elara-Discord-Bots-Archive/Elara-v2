const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "banlist",
            memberName: "banlist",
            aliases: [],
            examples: [`${client.commandPrefix}banlist`],
            description: "Gives you a list of the current bans in the server.",
            group: "mod",
            guildOnly: true,
            clientPermissions: ["BAN_MEMBERS"]
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        if(this.client.perms(this.client, message, "MANAGE_MESSAGES")) return;
        try{
        const bans = new Map();
        message.guild.fetchBans().then(async g => {
            bans[g.id] = g;
            let banlist = (`${bans[g.id].map(ge => `\n**User: **${ge.tag} (${ge.id})`).join('\n')}`)
            let noembed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setDescription(`No bans on this server.`)
                .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : "https://images-ext-2.discordapp.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discordapp.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
            if (banlist.length === 0) return message.channel.send(noembed)
            const embed = new Discord.RichEmbed()
                .setDescription(banlist)
                .setAuthor(message.guild.name, message.guild.iconURL ? message.guild.iconURL : "https://images-ext-2.discordapp.net/external/hHow2gpD0uyL8WnA8ynAHuPbzm_lE1lNAaxkLqDT0Fs/https/images-ext-1.discordapp.net/external/rBk_abKMsqAKoATjXbtyqKJt2bTXI_shMEemVpbNtFw/http/www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png")
                .setColor(`RANDOM`)
            message.channel.send(embed)
        });
    }catch(e){
            const bans = new Map();
            message.guild.fetchBans().then(async g => {
                bans[g.id] = g;
                let banlist = (`${bans[g.id].map(ge => `\n (${ge.username}) (${ge.id})`).join('\n')}`)

              const request = require('superagent');
              let { body } = await request
              .post(`https://paste.lemonmc.com/api/json/create`)
              .send({
              data: `Ban List\n\n${banlist}`,
              language: 'text',
              private: true,
              title: `${message.guild.name}`,
              expire: '2592000'
              }).catch(err => {
              message.channel.send(`ERROR:\n${err}`)
              })
              let link = `https://paste.lemonmc.com/${body.result.id}/${body.result.hash}`
              let embed = new Discord.RichEmbed()
              .setColor(`RANDOM`)
              .setAuthor(message.guild.name, message.guild.iconURL)
              .setDescription(`Link: [Click Here](${link})`)
              return message.channel.send(embed)
            });
            
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
    }
    }
}