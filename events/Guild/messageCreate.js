const database = require('../../Schemas/ticketHandler')
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const client = require("../../index");
const colors = require("colors");

const fs = require('fs')
const yaml = require('js-yaml');
let config = yaml.load(fs.readFileSync(`${process.cwd()}/config/config.yml`, 'utf8'))

module.exports = {
    name: "messageCreate"
  };
  
  client.on('messageCreate', async (message) => {
  
	if (message.author.bot) return;

    let db = await database.findOne({GuildID: message.guild.id, ChannelID: message.channel.id})

    if(db) {
        if(message.member.roles.cache.get(client.config.Tickets.ticketStaffID)) {
            if(!db.HandlerID) {
                db.HandlerID = message.author.id
                db.save()

                let embed = new EmbedBuilder()
                .setTitle('✉️ • Your Ticket Supporter')
                .setDescription(`**${message.author.username}** Has been assigned as the ticket support.`)
                .setColor("Blue")

                message.channel.send({embeds: [embed]})
				
				await message.channel.permissionOverwrites.set([
				{ id: config.Bot.ticketSupportRoleId, deny: [PermissionsBitField.Flags.ViewChannel] },
				{
				  id: message.author.id,
				  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.UseApplicationCommands],
				}
			  ]);
            }
        }
    }

    if(message.channel.name.startsWith('ticket-')) return
    //anti-link
    const forbiddenLinks = config.forbiddenLinks;
    if(message.author.bot) return
	
	const containsForbiddenLinks = forbiddenLinks.some((phrase) => message.content.toLowerCase().includes(phrase));
	const channel = client.channels.cache.get(config.Anti_Link_Options.announceStaffChannel);
	
	if (containsForbiddenLinks) {
		if (message.member.roles.cache.get(client.config.Anti_Link_Options.allowed_roleID)) return
		let option = client.config.Anti_Link_Options.link_punishment

		if (client.config.Anti_Link_Options.verbose) {
			console.log('[Alert]'.red + ` ${message.author.tag} has trigged the anti-link system.`.yellow)
			channel.send('[Alert] ' + ` ${message.author.tag} has trigged the anti-link system. \nHis message: ${message}`)
		}

		if(option.toLowerCase().startsWith('kick')) {
		message.guild.members.kick(message.author.id, {reason: 'Sent a link'}).catch((err) => {
			message.channel.send({content: `I do not have permissions to kick ${message.author}`})
			return message.delete()
		})
		message.delete()
		} else if(option.toLowerCase().startsWith('ban')) {
			message.guild.members.ban(message.author.id, {reason: 'Sent a link'}).catch((err) => {
				message.channel.send({content: `I do not have permissions to ban ${message.author}`})
				return message.delete()
			})
			message.delete()
		} else if(option.toLowerCase().startsWith('mute')) {
			message.member.timeout('500000', 'Sent a link').catch((err) => {
				message.channel.send({content: `I do not have permissions to mute ${message.author}`})
				return message.delete()
			})
			message.delete()
		} else message.delete()
	}
})
