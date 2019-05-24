const {RichEmbed} = require('discord.js');
const moment = require('moment');
const Settings = require('../util/models/settings.js');
const Stats = require('../util/models/stats.js');
module.exports.run = async (client) => {
const blacklist = require('../util/models/blacklist.js');
blacklist.findOne({clientID: client.user.id}, async (err, db) => {
    if(!db){
        const newdb = new blacklist({
            clientName: client.user.username, 
            clientID: client.user.id,
            list: []
        });
        newdb.save().catch(err => client.error(client, null, err.stack))
    }
});
//Stats Database for the bot
Stats.findOne({clientID: client.user.id}, async(err, db) => {
    if(!db){
        const newdb = new Stats({
            clientTag: client.user.tag,
            clientID: client.user.id,
            cmdrun: 0,
            msgrun: 0,
            guildsjoin: 0,
            guildsleft: 0,
            restarts: 0,
            shutdowns: 0,
            starts: 0
        });
        newdb.save().catch(err => console.log(err));
    }else{
        db.starts = db.starts + 1
        db.save().catch(e => console.log(e))
    }
})
//Settings Database for the bot
client.guilds.forEach(async guild => {

        //Gets the Settings for the server, if there isn't one it creates a database for the server etc. 
        Settings.findOne({ guildID: guild.id }, (err, settings) => {
            if (err) console.log(err);
            if (!settings) {
                const newset = new Settings({
                    guildName: guild.name,
                    guildID: guild.id,
                    prefix: "",
                    logchannel: "",
                    reportschannel: "",
                    vclogs: "",
                    actionlog: "",
                    toggles: {user: false, mod: true, messages: true, server: true, joins: true}
                });
                newset.save().catch(err => console.log(err));
            }
            if(settings.prefix !== ''){
                guild._commandPrefix = settings.prefix;
            }
        });
    });

    // Ready message and logging that the client connected to discord.
    let stat = await Stats.findOne({clientID: client.user.id}, async(err, db) => {db})
    let e = new RichEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setColor(client.util.colors.green)
    .setTitle(`Connected`)
    .addField(`Client Account`, `**User: **${client.user} \`${client.user.tag}\` (${client.user.id})`)
    .addField(`Stats`, `
    **Servers: **${client.guilds.size}
    **Channels: **${client.channels.size}
    **Users: **${client.users.size}
    **Emojis: **${client.emojis.size}`, true)
    .addField(`Dev Stats`, `
    **Messages Sent: **${stat.msgrun}
    **Commands Ran: ** ${stat.cmdrun}
    **Guilds Joined: **${stat.guildsjoin}
    **Guilds Left: **${stat.guildsleft}
    **Restarts: **${stat.restarts}
    **Shutdowns: **${stat.shutdowns}
    **Starts: **${stat.starts}
    `, true)
    .addField(`Connected At`, `${moment(new Date()).format('dddd, MMMM Do YYYY h:mm:ss a zz')}`)
    client.channels.get(client.config.log).send(e)


    console.log(`[Connected] ${client.user.tag} is online in ${client.guilds.size} Servers, ${client.channels.size} Channels, ${client.emojis.size} Emojis, Member Count:\n- Total: ${client.users.size}\n- Humans: ${client.users.filter(m => !m.bot).size}\n- Bots: ${client.users.filter(m => m.bot).size}`)

// Starting up.. playing status then after 1 minute it switches to the one from playing.js 
    client.user.setPresence({status: "dnd", game: {name: "Starting up...",type: "PLAYING"}});
    setTimeout(async () => {    
        require('../util/playing.js')(client)
}, 60000)
     let embed = new RichEmbed()
    .setAuthor(client.user.tag, client.user.displayAvatarURL)
    .setColor(client.util.colors.green)
    .setTitle(`Connected`)
    .setTimestamp()
    client.channels.get("532628525640056852").send(embed)
}
