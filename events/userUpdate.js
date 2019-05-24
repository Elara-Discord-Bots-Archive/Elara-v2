const {RichEmbed} = require('discord.js');
const {get} = require('superagent');
module.exports.run = async (client, o, n) => {
        try{
            if(o.username === n.username && o.discriminator === n.discriminator && o.displayAvatarURL === n.displayAvatarURL || n.bot) return;
            client.guilds.forEach(async g => {
                let bl = ["264445053596991498", "343572980351107077"]
                if(bl.includes(g.id)) return;
                if(g.members.get(n.id)){
                    let e = new RichEmbed()
                    .setAuthor(g.name, g.iconURL)
                    .setColor("#00ffe9")
                    .setTimestamp()
                    .setTitle(`User Update`)
                    .setDescription(`${n} \`@${n.tag}\` (${n.id})`);
                    let e2 = new RichEmbed().setTitle(`After`)
                    .setColor("#00ffe9")
                    .setTimestamp()
                    if(o.username !== n.username) e.addField(`Username`, `**Old: **${o.username}\n**New: **${n.username}`)
                    if(o.discriminator !== n.discriminator) e.addField(`Discriminator`, `**Old: **${o.discriminator}\n**New: **${n.discriminator}`)
                    if(o.displayAvatarURL !== n.displayAvatarURL){
                    e.addField(`Avatar`, `**Old: **[Link](${o.displayAvatarURL})\n**New:** [Link](${n.displayAvatarURL})`)
                        if(o.displayAvatarURL.includes('assets')){
                            e.setImage(o.displayAvatarURL)
                        }else{
                            let avatar;
                            avatar = `http://media.discordapp.net/avatars/${o.id}/${o.avatar}${o.displayAvatarURL.includes('.gif') ? ".gif" : ".png"}?size=2048`
                            try {
                                let body = await get(avatar);
                                avatar = body.request.url
                            } catch (e) {
                                avatar = `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                            }
                            e.setImage(avatar)
                        }
                        if(n.displayAvatarURL.includes('assets')){
                            e2.setImage(n.displayAvatarURL)
                        }else{
                            let avatar;
                            avatar = `http://media.discordapp.net/avatars/${n.id}/${n.avatar}${n.displayAvatarURL.includes('.gif') ? ".gif" : ".png"}?size=2048`
                            try {
                                let body = await get(avatar);
                                avatar = body.request.url
                            } catch (e) {
                                avatar = `http://www.kalahandi.info/wp-content/uploads/2016/05/sorry-image-not-available.png`
                            }
                            e2.setImage(avatar)
                        }
                        setTimeout(async () => {client.functions.user(client, g, e2)}, 2000)
                    }
                setTimeout(async () => { client.functions.user(client, g, e)}, 1000)
                }
            })
    }catch(e){
        console.log(`User Update ERROR: ${e.stack}`)
    }
}
