const { Command } = require("../../../util/Commando");
const { get } = require("snekfetch");
const { RichEmbed } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = class YTStatsCMD extends Command {

    constructor(client) {
        super(client, {
            name: "ytstats",
            group: "info",
            aliases: ["youtubestats", "youtubesubs", "youtubeinfo", "ytinfo"],
            memberName: "ytstats",
            description: "Get YouTube Channel Statisitcs Directly From YouTube.",
            usage: ["<prefix>ytstats <channel name or URL>"],
            throttling: {
                usages: 1,
                duration: 5
            },
            args: [{
                key: "ytname",
                prompt: "Please enter a YouTube Channel Name or URL?\n",
                type: "string"
            }]
        });
    }
    async run(msg, { ytname }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try {
            if (ytname === "G") ytname = "G-Rated Family Gaming";
            const APIKey = this.client.config.youtube;
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${ytname}&key=${APIKey}&maxResults=1&type=channel`;
            const a = await get(url).then(res => res.body).catch(e => msg.reply(e));
            const url2 = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics,brandingSettings&id=${a.items[0].id.channelId}&key=${APIKey}`;
            const subcount = await get(url2).then(res => res.body).catch(e => msg.reply(e));
            let ch = a.items[0];
            const embed = new RichEmbed()
                .setFooter(`YouTube Channel Statistics - ${this.client.user.tag}`, this.client.user.displayAvatarURL)
                .setTimestamp()
                .setColor("RANDOM")
                .setAuthor(ch.snippet.channelTitle, ch.snippet.thumbnails.high.url, `https://www.youtube.com/channel/${ch.id.channelId}`)
                .setTitle(`Long Description`)
                .setDescription(`${subcount.items[0].brandingSettings.channel.description ? subcount.items[0].brandingSettings.channel.description : "None"}`)
                .addField(`Short Description`, ch.snippet.description ? ch.snippet.description : "None")
                .addField(`Channel ID`, `${ch.id.channelId}`)
                .addField("Subsciber Count:", parseInt(subcount.items[0].statistics.subscriberCount).toLocaleString(), true)
                .addField("View Count:", parseInt(subcount.items[0].statistics.viewCount).toLocaleString(), true)
                .addField("Video Count:", parseInt(subcount.items[0].statistics.videoCount).toLocaleString(), true)
            embed.addField("Created At:", moment(ch.snippet.publishedAt).format("MMMM Do YYYY"), true)
            embed.setThumbnail(ch.snippet.thumbnails.high.url);
            if (subcount.items[0].brandingSettings.image.bannerImageUrl === "http://s.ytimg.com/yts/img/channels/c4/default_banner-vfl7DRgTn.png") {
            } else {
                embed.setImage(subcount.items[0].brandingSettings.image.bannerImageUrl)
            }
            if (!subcount.items[0].snippet.customUrl) {
                embed.addField(`Channel URL`, `https://www.youtube.com/channel/${subcount.items[0].id}`)
            } else {
                embed.addField(`Normal URL`, `https://www.youtube.com/channel/${subcount.items[0].id}`)
                embed.addField(`Custom URL`, `https://www.youtube.com/c/${subcount.items[0].snippet.customUrl}`)
            }
            return msg.embed(embed);
        } catch (e) {
            this.client.logger(this.client, msg.guild, e.stack, msg, msg.channel)
            return msg.reply("❌ There was an error, please try again with a valid URL or Channel Name.");
        }
    }

};