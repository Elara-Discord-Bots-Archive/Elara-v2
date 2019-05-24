const { Command } = require('../../../util/Commando'),
    Discord = require('discord.js');
const weather = require('weather-js');
module.exports = class NCommand extends Command {
    constructor(client) {
        super(client, {
            name: "weather",
            memberName: "weather",
            aliases: [],
            examples: [`${client.commandPrefix}weather London`],
            description: "Gives you the weather in the city you choose..",
            group: "info",
            args: [
                {
                    key: 'content',
                    prompt: 'Please provide a city..',
                    type: 'string'
                }
            ]
        })
    }
    async run(message, { content }) {
        this.client.stats(this.client, "cmd", null, null, null)
        try{
        weather.find({ search: content, degreeType: 'F' },async function (err, result) {
        await weather.find({ search: content, degreeType: 'C' }, (err, typec) => {
            if (err) message.channel.send(err);
            if (result === undefined || result.length === 0) {
                message.channel.send('**Please enter a location!**')
                return;
            }
            var current2 = typec[0].current;
            var location2 = typec[0].location;
            var current = result[0].current;
            var location = result[0].location;
            // console.log(result[0].forecast)
            const embed = new Discord.RichEmbed()
                .setTitle(`**${current.skytext}**`)
                .setAuthor(`Weather for ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor(`RANDOM`)
                if(location.alert !== ''){
                    embed.addField(`ALERT`, location.alert, true)
                }
                embed.addField('Timezone', `UTC-${location.timezone.replace('-', '')}`, true)
                .addField('Temperature', `${current.temperature}°F\n${current2.temperature}°C`, true)
                .addField('Feels Like', `${current.feelslike}°F\n${current2.feelslike}°C`, true)
                .addField('Winds', current.winddisplay, true)
                .addField('Humidity', `${current.humidity}%`, true)
            .addField(`5 Day Forecast`, `\u200b`)
            .addField(result[0].forecast[0].day, `
               - Low: ${result[0].forecast[0].low}°F ${typec[0].forecast[0].low}°C
               - High: ${result[0].forecast[0].high}°F ${typec[0].forecast[0].high}°C
               - Sky: ${result[0].forecast[0].skytextday}`, true)
            .addField(result[0].forecast[1].day, `
               - Low: ${result[0].forecast[1].low}°F ${typec[0].forecast[1].low}°C
               - High: ${result[0].forecast[1].high}°F ${typec[0].forecast[1].high}°C
               - Sky: ${result[0].forecast[1].skytextday}`, true)
            .addField(result[0].forecast[2].day, `
               - Low: ${result[0].forecast[2].low}°F ${typec[0].forecast[2].low}°C
               - High: ${result[0].forecast[2].high}°F ${typec[0].forecast[2].high}°C
               - Sky: ${result[0].forecast[2].skytextday}`, true)
            .addField(result[0].forecast[3].day, `
               - Low: ${result[0].forecast[3].low}°F ${typec[0].forecast[3].low}°C
               - High: ${result[0].forecast[3].high}°F ${typec[0].forecast[3].high}°C
               - Sky: ${result[0].forecast[3].skytextday}`, true)
            .addField(result[0].forecast[4].day, `
               - Low: ${result[0].forecast[4].low}°F ${typec[0].forecast[4].low}°C
               - High: ${result[0].forecast[4].high}°F ${typec[0].forecast[4].high}°C
               - Sky: ${result[0].forecast[4].skytextday}`, true)
            message.channel.send({ embed });
        });
        })
        } catch (e) {
            this.client.error(this.client, message, e);
            this.client.logger(this.client, message.guild, e.stack, message, message.channel)
        }
    }
}