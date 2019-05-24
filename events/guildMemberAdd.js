const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
module.exports.run = (client, member) => {
    try{
    let botembed = new Discord.RichEmbed()
        .setColor(`#FF000`)
        .setAuthor(`Member Joined${client.isOwner(member.user.id) ? ' - 🛡 Bot Owner' : ''}`, member.user.displayAvatarURL)
        .setTitle(`Userinfo`)
        .setDescription(`**Mention: **${member.user}\n**Tag: **${member.user.tag}\n**ID: **${member.id}\n**Created At: ${moment(member.user.createdAt).format('dddd, MMMM Do YYYY')}**\n**MemberCount: **${member.guild.memberCount}`)
        .setThumbnail(member.user.displayAvatarURL)
    if (member.user.username.includes("discord.gg/") || member.user.username.includes("discord.me/")) { botembed.addField(`Invite Detected`, `This user has a invite in their username`) }
//     if(member.guild.id === "273525914187333637"){
//     member.guild.channels.get("450465589064892423").send(botembed)
//     }else{
    client.functions.joins(client, member.guild, botembed)
//     }
    }catch(e){
        client.logger(client, member.guild, e.stack)
    }
}
