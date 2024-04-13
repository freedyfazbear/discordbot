const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, ChannelType} = require("discord.js");
const client = require("../../index");
let database = require('../../Schemas/ticketHandler')
const yaml = require('js-yaml');
const fs = require('fs')

let config = yaml.load(fs.readFileSync(`${process.cwd()}/config/config.yml`, 'utf8'))

const verify = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('claimticket')
            .setLabel('Claim Ticket!')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('✅'),
        )
const row = new ActionRowBuilder()
	.addComponents(verify);	

module.exports = {
  name: "interactionCreate"
};

client.on('interactionCreate', async (interaction) => {
  if(interaction.customId == 'open') {

    interaction.guild.channels.create( {
        name: `ticket-${interaction.user.username}`,
        type: ChannelType.GuildText,
        parent: client.config.Tickets.ticketCategoryID,
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: client.config.Tickets.ticketStaffID,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
        ],
      })
      .then(async (x) => {
        interaction.editReply({
          content: `Your ticket has been created ${x}`,
          ephemeral: true,
        });

        await x.permissionOverwrites.set([
            { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
            {
              id: interaction.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.UseApplicationCommands],
            }, {
              id: client.config.Tickets.ticketStaffID,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
            }
          ]);

        const embed = new EmbedBuilder()
        .setTitle(`:wave: ・ Hi ${interaction.user.username}`)
        .setDescription(`Please explain your issue and a staff member will be with you shortly.`)
        .setColor('Red')
		
        x.send({components: [row]}).then(async id => {
            await database.create({
                GuildID: interaction.guild.id,
                UserID: interaction.user.id,
                ChannelID: x.id,
                isHandled: false
            })
        })
    })
  }
  if (interaction.customId == 'ticket-select') {
	const value = interaction.values[0]
	
	if (value === 'ban') {
		interaction.guild.channels.create( {
			name: `ban-${interaction.user.username}`,
			type: ChannelType.GuildText,
			parent: client.config.Tickets.ticketBanCategoryID,
			permissionOverwrites: [
			  {
				id: interaction.guild.id,
				deny: [PermissionsBitField.Flags.ViewChannel],
			  },
			  {
				id: client.config.Tickets.ticketStaffID,
				allow: [PermissionsBitField.Flags.ViewChannel],
			  },
			],
		  })
		  .then(async (x) => {
			interaction.reply({content: `Your ticket has been created ${x}`, ephemeral: true})

			await x.permissionOverwrites.set([
				{ id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
				{
				  id: interaction.user.id,
				  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.UseApplicationCommands],
				}, {
				  id: client.config.Tickets.ticketStaffID,
				  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
				}
			  ]);

			let embed = new EmbedBuilder()
			.setTitle(`:wave: ・ Hi ${interaction.user.username}`)
			.setDescription(`Please explain your issue and a staff member will be with you shortly.`)
			.setColor('Red')
			x.send({embeds: [embed]}).then(async id => {
				await database.create({
					GuildID: interaction.guild.id,
					UserID: interaction.user.id,
					ChannelID: x.id,
					isHandled: false
				})
			});
		})
	}
	
	if (value === 'mc') {
		await interaction.deferReply({ephemeral: true})
		
		interaction.guild.channels.create( {
			name: `mc-${interaction.user.username}`,
			type: ChannelType.GuildText,
			parent: client.config.Tickets.ticketMinecraftCategoryID,
			permissionOverwrites: [
			  {
				id: interaction.guild.id,
				deny: [PermissionsBitField.Flags.ViewChannel],
			  },
			  {
				id: client.config.Tickets.ticketStaffID,
				allow: [PermissionsBitField.Flags.ViewChannel],
			  },
			],
		  })
		  .then(async (x) => {
			interaction.editReply({
			  content: `Your ticket has been created ${x}`,
			  ephemeral: true,
			});

			await x.permissionOverwrites.set([
				{ id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
				{
				  id: interaction.user.id,
				  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.UseApplicationCommands],
				}, {
				  id: client.config.Tickets.ticketStaffID,
				  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
				}
			  ]);

			const embed = new EmbedBuilder()
			.setTitle(`:wave: ・ Hi ${interaction.user.username}`)
			.setDescription(`Please explain your issue and a staff member will be with you shortly.`)
			.setColor('Red')
			x.send({embeds: [embed]}).then(async id => {
				await database.create({
					GuildID: interaction.guild.id,
					UserID: interaction.user.id,
					ChannelID: x.id,
					isHandled: false
				})
			})
		})
	}
	
	if (value === 'store') {
		await interaction.deferReply({ephemeral: true})
		
		interaction.guild.channels.create( {
			name: `store-${interaction.user.username}`,
			type: ChannelType.GuildText,
			parent: client.config.Tickets.ticketStoreCategoryID,
			permissionOverwrites: [
			  {
				id: interaction.guild.id,
				deny: [PermissionsBitField.Flags.ViewChannel],
			  },
			  {
				id: client.config.Tickets.ticketStaffID,
				allow: [PermissionsBitField.Flags.ViewChannel],
			  },
			],
		  })
		  .then(async (x) => {
			interaction.editReply({
			  content: `Your ticket has been created ${x}`,
			  ephemeral: true,
			});

			await x.permissionOverwrites.set([
				{ id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
				{
				  id: interaction.user.id,
				  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.UseApplicationCommands],
				}, {
				  id: client.config.Tickets.ticketStaffID,
				  allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
				}
			  ]);

			const embed = new EmbedBuilder()
			.setTitle(`:wave: ・ Hi ${interaction.user.username}`)
			.setDescription(`Please explain your issue and a staff member will be with you shortly.`)
			.setColor('Red')
			x.send({embeds: [embed]}).then(async id => {
				await database.create({
					GuildID: interaction.guild.id,
					UserID: interaction.user.id,
					ChannelID: x.id,
					isHandled: false
				})
			})
		})
	}
  }
});

