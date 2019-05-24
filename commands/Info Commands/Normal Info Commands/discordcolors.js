const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const colors = require('../../../util/util.js').dcolors;
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "discordcolors",
            memberName: "discordcolors",
            aliases: ["dc", "discordsyntax"],
            examples: [`${client.commandPrefix}discordcolors`],
            description: "Gives you the different Discord Syntax Codes and Examples",
            group: "info"
        })
    }
    async run(message) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        let embed = new Discord.RichEmbed()
            .setColor(`RANDOM`)
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL)
            .setTitle(`List of all of the Discord Syntax Codes and Examples.\nPut 3 **\`** at the back and front of the message.`)
            .setTimestamp()
            .setAuthor(this.client.user.tag, this.client.user.displayAvatarURL)
            .addField('1. Regular', colors.normal)
            .addField(`2. CSS`, colors.css)
            .addField(`3. FIX`, colors.fix)
            .addField(`4. MD`, colors.md)
            .addField(`5. PY`, colors.py)
            .addField(`6. CS`, colors.cs)
            .addField(`7. DIFF`, colors.diff)
            .addField(`8. XL`, colors.xl)
            .addField(`9. TEX`, colors.tex)
            .addField(`10. JAVA`, colors.java)
            .addField(`11. JS`, colors.js)
            .addField(`12. XML`, colors.xml)
            .addField(`13. PROLOG`, colors.prolog)
            .addField(`14. ML`, colors.ml)
            .addField(`15. JSON`, colors.json)
            .addField(`16. INI`, colors.ini)
            .addField(`17. HTML`, colors.html)
            .addField(`18. GLSL`, colors.glsl)
            .addField(`19. CPP`, colors.cpp)
            .addField(`20. COFFEESCRIPT`, colors.coffee)
            .addField(`21. BASH`, colors.bash)
            .addField(`22. AUTOHOTKEY`, colors.auto)
            .addField(`23. ASCIIDOC`, colors.asciidoc)
        message.embed(embed)
        }catch(e){
            this.client.error(this.client, message, e);
           
           this.client.logger(this.client, message.guild, e.stack, message, message.channel)
           
        }
    }
}