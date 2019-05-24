const Discord = require('discord.js');
const cooldown = new Set();
module.exports.run = async (client, message) => {
     if (message.channel.name === "server-suggestions" || message.channel.name === "📝server-suggestions📝" || message.channel.name === "suggestions" || message.channel.name === "suggestion" || message.channel.name === "server-suggestion" || message.channel.name === "📝suggestions" || message.channel.name === "📝suggestions📝" || message.channel.name === "suggestions📝") {
        if (message.author.id === "288450828837322764" || message.author.id === "248947473161256972" || message.guild.id === "499409162661396481" || message.author.id === message.guild.ownerID || message.author.bot) return;
            message.react("✅")
            message.react("❌")
    }
    let msg = message;
    if (message.author.bot) return;
    try{
    if(message.guild){
    let db = await client.db.findOne({guildID: message.guild.id}, (err, settings) => {settings})
    if(message.author.tag.includes('#0000')) return;
    if(message.content.startsWith(db.prefix || client.commandPrefix)){
        return;
    }else{
        if(message.channel.name.includes("spam")) return;
        if (message.guild.id === "264445053596991498" || message.guild.id === "343572980351107077") return;
        if(cooldown.has(message.author.id)){
            return;
        }
        if(!client.isOwner(message.author.id)){
            cooldown.add(message.author.id);
        }
        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 6 * 10000)
    }
    client.coins(client, message);
    client.db.findOne({ guildID: message.guild.id }, (err, settings) => {
        if (err) console.log(err);
        if (settings) {
            if (settings.prefix == "") return;
            message.guild._commandPrefix = settings.prefix
        }
    });
    if(message.author.bot === false){
        client.stats(client, null, message, null, null);
    }
}
} catch (e) {
client.logger(client, message.guild, e.stack, message, message.channel)
}
}
