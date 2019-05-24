const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
require("moment-duration-format");
const fetch = require('node-fetch');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "playingstatus",
            memberName: "playingstatus",
            aliases: [`ps`],
            examples: [`${client.commandPrefix}playingstatus @user`],
            description: "Shows the playing status of you or the member id or mention you give.",
            group: "server",
            guildOnly: true,
            args: [
                {
                    key: "member",
                    prompt: "What member do you want to see their playing status?",
                    type: "member",
                    default: message => message.member
                }
            ]
        })
    }
    async run(m, { member }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let p = member.presence.game;
        let e = new Discord.RichEmbed()
    .setAuthor(`${member.user.tag}'s Playing Status`, member.user.displayAvatarURL)
    .setColor(`RANDOM`)
    .addField(`Status`, `${this.client.util.status[member.presence.status]} ${member.presence.status.toUpperCase()}`)
    .setFooter(`Want to see someone elses playing status? Do ${m.guild._commandPrefix ? m.guild._commandPrefix : this.client.commandPrefix}playingstatus @user/userid`)
    if(member.presence.game === null){ // Playing Nothing...
        e.addField(`Game`, `None`)
        m.say(e)
    }else
    if(member.presence.game.type === 0) { // Playing
        if (member.presence.game.assets === null) {
            e.addField(`Playing`, member.presence.game.name)
        }else
        if(p.name === "Visual Studio Code") {
            e.addField(`Playing`, p.name, true)
            if(p.details !== null){
            e.addField(`Details`, p.details, true)
            }
            if(p.state !== null){
            e.addField(`State`, p.state, true)
            }
            if(p.assets.largeText !== null){
            e.addField(`Type`, p.assets.largeText, true)
            }
            e.setThumbnail("https://static1.squarespace.com/static/592e86ee9de4bb6e73d8c154/t/5982162d6a49631135282359/1501756993395/vscode.png")
        }else
        if(member.presence.game.party !== null) {
            if(member.presence.game.name.toLowerCase() === "fortnite"){
            e.setThumbnail(`https://boop.page.link/CsvY`)
                e.addField(`Playing`, p.name, true)
                if(p.state !== null){
                e.addField(`Game Type`, member.presence.game.details, true)
                }
                if(p.state !== null){
                e.addField(`Game Mode`, member.presence.game.state, true)
                }
                if(p.party !== null){
                e.addField(`Party Size`, `${member.presence.game.party.size[0]}-${member.presence.game.party.size[1]}`, true)
            }            
        }
        }
        m.say(e)
    }else
    if (member.presence.game.type === 1) { // Streaming
        const query = new URLSearchParams([['client_id', this.client.config.twitch]]);
        const url = new URL(`https://api.twitch.tv/kraken/channels/${encodeURIComponent(p.url.slice(22))}`);
        url.search = query;

        const body = await fetch(url)
            .then(response => response.json())
            .catch(() => {console.log(`ERROR... Streaming..`) });
        let mature = body.mature ? "Yes": "No",
            partner = body.partner ? "Yes" :"No",
            game = body.game ? body.game : "None",
            status = body.status ? body.status : "None",
            name = body.display_name ? body.display_name : "None",
            errors = "ERROR Fetching the\nData for this channel";
        e.addField(`Streaming`, member.presence.game.name)
        if(body.status === 400){e.addField(`Info`, `I couldn't fetch any data on this streamer`)}
        if(body.display_name !== null&& body.status !== 400) {e.addField(`Display Name`, name, true)}
        e.addField(`URL`, `[Click Here](${member.presence.game.url})`, true)
        if(body.status !== null && body.status !== 400) {e.addField(`Status`, status, true)}
        if(body.game !== null && body.status !== 400) {e.addField(`Game`, game, true)}
        if(body.partner !== null && body.status !== 400) {e.addField(`Partnered`, partner, true)}
        if(body.mature !== null && body.status !== 400){e.addField(`Mature`, mature, true) }
        if (body.followers !== null && body.status !== 400){e.addField(`Follower Count`, body.followers, true) }
        if(body.views!== null && body.status !== 400){e.addField(`View Count`, body.views, true) }
        if(body.logo !== null) {e.setThumbnail(body.logo)}
        if(body.video_banner !== null) {e.setImage(body.video_banner)}
        m.say(e)
    }else
    if(member.presence.game.type === 2) { // Listening
        e.addField(`Listening To`, member.presence.game.name, true)
        if(member.presence.game.assets !== null) {
            e.addField(`Album`, p.assets.largeText, true)
            e.addField(`Artist Name`, member.presence.game.state, true)
            e.addField(`Song Name`, member.presence.game.details, true)
            e.setThumbnail(`https://i.scdn.co/image/${p.assets.largeImage.slice(8)}`)
            e.addField(`Song URL`, `[Click Here](https://open.spotify.com/track/${member.presence.game.syncID})`, true)
        }
        m.say(e)
    }else 
    if(member.presence.game.type === 3){ // Watching
        e.addField(`Watching`, member.presence.game.name)
        m.say(e)
    }
    } catch (e) {
        this.client.error(this.client, m, e);
    this.client.logger(this.client, m.guild, e.stack, m, m.channel)
    }
    }
}