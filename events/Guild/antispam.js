
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const client = require("../../index");
const usersMap = new Map();
const LIMIT = 2;
const DIFF = 5000;
const TIME = 3000
const colors = require("colors");

const fs = require('fs')
const yaml = require('js-yaml');
let config = yaml.load(fs.readFileSync(`${process.cwd()}/config/config.yml`, 'utf8'))

module.exports = {

    name: "messageCreate"
  };
  
  client.on('messageCreate', async (message) => {
	
	if (message.author.bot) return;
	
    setTimeout(() => {



    if(usersMap.has(message.member.id)) {
        const userData = usersMap.get(message.member.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
		
		const channel = client.channels.cache.get(config.Anti_Link_Options.announceStaffChannel);
		
        let msgCount = userData.msgCount;

        if(difference > DIFF) {
            clearTimeout(timer);
            console.log('Cleared Timeout');
            userData.msgCount = 1;
            userData.lastMessage = message;
            userData.timer = setTimeout(() => {
                usersMap.delete(message.member.id);
                console.log('Removed from map.')
            }, TIME);
            usersMap.set(message.member.id, userData)
        }
        else {
            ++msgCount;
            if(parseInt(msgCount) === LIMIT) {
              message.channel.bulkDelete(LIMIT);
               
              message.member.roles.add(config.Anti_Link_Options.muteIdRole)
              if(client.config.Anti_Link_Options.verbose) {
                console.log('[Alert]'.red + ` ${message.author.tag} has trigged the anti-spam system. They have been muted for 5 minutes.`.yellow)
				channel.send('[Alert] ' + ` ${message.author.tag} has trigged the anti-spam system. They have been muted for 5 minutes.`)
			}

              setTimeout(() => {
                message.member.roles.remove(config.Anti_Link_Options.muteIdRole)
              }, 500000)
              
               
            } else {
                userData.msgCount = msgCount;
                usersMap.set(message.member.id, userData);
            }
        }
    }
    else {
        let fn = setTimeout(() => {
            usersMap.delete(message.member.id);
            console.log('Removed from map.')
        }, TIME);
        usersMap.set(message.member.id, {
            msgCount: 1,
            lastMessage : message,
            timer : fn
        });
    }
}, 150)
})
