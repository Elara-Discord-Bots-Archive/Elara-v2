const util = require('util');
const discord = require('discord.js');
const tags = require('common-tags');
const escapeRegex = require('escape-string-regexp');
const { Command } = require('../../../util/Commando');
const superagent = require('superagent');
const moment = require('moment');
require('moment-countdown');
require('moment-duration-format');
require('moment-timezone');
const Commando = require('../../../util/Commando');
const { startTyping, stopTyping } = require('../../../util/util.js')
const os = require('os');
const Money = require('../../../util/models/money.js');
const log = require('../../../util/models/settings.js');
const reps = require('../../../util/models/reps.js');
const nl = '!!NL!!';
const nlPattern = new RegExp(nl, 'g');

module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            group: 'owner',
            memberName: 'eval',
            aliases: ["ev", "e", "eva", "code", "evalcode", "evaluate"],
            description: 'Executes JavaScript code.',
            details: 'Only the bot owner(s) may use this command.',
            hidden: true,
            guarded: true,
            ownerOnly: true,
            args: [
                {
                    key: 'script',
                    prompt: 'What code would you like to evaluate?',
                    type: 'string'
                },

            ]
        });

        this.lastResult = null;
    }

    async  run(msg, args) {
        this.client.stats(this.client, "cmd", null, null, null)
        // Make a bunch of helpers
        /* eslint-disable no-unused-vars */
        const channels = this.client.channels;
	const guilds = this.client.guilds;
	const emojis = this.client.emojis;
	const users = this.client.users;
        const Discord = discord;
        const message = msg;
        const bot = this.client;
        const client = msg.client;
        const objects = client.registry.evalObjects;
        const lastResult = this.lastResult;
        const m = msg;
        const c = msg.channel;
        const embed = new discord.RichEmbed()
        const e = embed;
        const doReply = val => {
            if (val instanceof Error) {
                msg.say(`Callback error: \`${val}\``);
            } else {
                const result = this.makeResultMessages(val, process.hrtime(this.hrStart));
                if (Array.isArray(result)) {
                    for (const item of result) {
                        if (this.client.options.selfbot) msg.say(item); else msg.say(item);
                    }
                } else if (this.client.options.selfbot) {
                    msg.say(result);
                } else {
                    msg.say(result);
                }
            }
        };
        /* eslint-enable no-unused-vars */

        // Run the code and measure its execution time
        let hrDiff;
        try {
            const hrStart = process.hrtime();
            this.lastResult = eval(args.script);
            hrDiff = process.hrtime(hrStart);
        } catch (err) {
            return msg.say(`Error while evaluating: \`${err}\``);
        }

        // Prepare for callback time and respond
        this.hrStart = process.hrtime();
        let response = this.makeResultMessages(this.lastResult, hrDiff, args.script, msg.editable);
        if (msg.editable) {
            if (response instanceof Array) {
                if (response.length > 0) response = response.slice(1, response.length - 1);
                for (const re of response) msg.say(re);
                return null;
            } else {
                return msg.edit(response);
            }
        } else {
            return msg.say(response);
        }
    }

    makeResultMessages(result, hrDiff, input = null, editable = false) {
        const inspected = util.inspect(result, { depth: 0 })
            .replace(nlPattern, '\n')
            .replace(this.sensitivePattern, '--Nope--');
        const split = inspected.split('\n');
        const last = inspected.length - 1;
        const prependPart = inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'" ? split[0] : inspected[0];
        const appendPart = inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== "'" ?
            split[split.length - 1] :
            inspected[last];
        const prepend = `\`\`\`javascript\n${prependPart}\n`;
        const append = `\n${appendPart}\n\`\`\``;
        if (input) {
            return discord.splitMessage(tags.stripIndents`
				${editable ? `
					*Input*
					\`\`\`javascript
					${input}
					\`\`\`` :
                    ''}
				*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`, 1900, '\n', prepend, append);
        } else {
            return discord.splitMessage(tags.stripIndents`
				*Callback executed after ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*
				\`\`\`javascript
				${inspected}
				\`\`\`
			`, 1900, '\n', prepend, append);
        }
    }

    get sensitivePattern() {
        if (!this._sensitivePattern) {
            const client = this.client;
            let pattern = '';
            if (client.token) pattern += escapeRegex(client.token)
            Object.defineProperty(this, '_sensitivePattern', { value: new RegExp(pattern, 'gi') });
        }

        return this._sensitivePattern;
    }

};
