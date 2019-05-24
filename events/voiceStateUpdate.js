const re = require('discord.js').RichEmbed
module.exports.run = async(client, oldVoice, newVoice) => {
    //Short cuts to the user object and gets the channel so it posts the name.
    try{
    let nu = oldVoice.user;
    let oc = oldVoice.guild.channels.get(oldVoice.voiceChannelID)
    let nc = newVoice.guild.channels.get(newVoice.voiceChannelID)
    // Creates the embed.
    let embed = new re()
    .setAuthor(nu.tag, nu.displayAvatarURL)
    .setColor(`#FF000`)
    
    // Server Muted Checks and sending to the voice chat logs.
    if(oldVoice.serverMute !== newVoice.serverMute){
    if(newVoice.guild.me.hasPermission('VIEW_AUDIT_LOG')){
        // Fetches the audit logs for the server mute.
     await newVoice.guild.fetchAuditLogs({type: "MEMBER_UPDATE"}).then(async audit => { 
    let log = await audit.entries.first()
    let mod = audit.entries.first().executor;
    let types = {
    "true": "server muted",
    "false": "un server muted"
    }
// Creates the embed for the server mute or un server mute
let e = new re()
    .setColor(client.util.colors.red)
    .setTitle(`Server Mute Update`)
    .setDescription(`${newVoice.user} has ${log.changes.map(c => types[c.new])}`)
    .addField(`Member`, `**User: **${newVoice} \`${newVoice.user.tag}\` (${newVoice.user.id})`)
    .addField(`Moderator`, `**User: **${mod} \`${mod.tag}\` (${mod.id})`)
    .addField(`Channel`, `**Channel: **${nc.name}`)
    return client.vclogs(client, oldVoice.guild, e)

})
//If the bot doesn't have view audit logs it will post Moderator unknown.
}else{
        let e = new re()
        .setColor(client.util.colors.red)
        .setTitle(`Server Mute Update`)
        .addField(`Member`, `**User: **${nu} \`${nu.tag}\` (${nu.id})`)
        .addField(`Moderator`, `Unknown.`)
        return client.vclogs(client, oldVoice.guild, e)
}
}

//If the user has joined or left the voice chat.
    if(oc === nc) return;
    if(oc === undefined){
        embed.setColor(client.util.colors.green)
        embed.setDescription(`${nu} has joined voice chat`)
        embed.addField(`Before`, oc ? oc.name : "None", true)
        embed.addField(`After`, nc ? nc.name : "None", true)
        return client.vclogs(client, oldVoice.guild, embed)
    }else
    if(nc === undefined){
        embed.setColor(client.util.colors.orange)
        embed.setDescription(`${nu} has left voice chat`)
        embed.addField(`Before`, oc ? oc.name : "None", true)
        embed.addField(`After`, nc ? nc.name : "None", true)
        return client.vclogs(client, oldVoice.guild, embed)
    }else{
        embed.setColor(client.util.colors.yellow)
        embed.setDescription(`${nu} has switched voice chat`)
        embed.addField(`Before`, oc ? oc.name : "None", true)
        embed.addField(`After`, nc ? nc.name : "None", true)
        return client.vclogs(client, oldVoice.guild, embed)
    }
}catch(e){
    client.logger(client, oldVoice.guild, e.stack)
}
}