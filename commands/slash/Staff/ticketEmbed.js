const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require("discord.js");


module.exports = {
    name: "ticketembed",
    description: "send the ticket embed",
    type: 1,
    staff: true,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {
        const verify = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('open')
            .setLabel('Open A Ticket!')
            .setStyle(ButtonStyle.Primary)
            .setEmoji('✅'),
        )
		
		const select = new StringSelectMenuBuilder()
			.setCustomId('ticket-select')
			.setPlaceholder('Make a selection!')
			.addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Ban Support')
					.setDescription('You got banned and you think it is misunderstanding?.')
					.setValue('ban'),
				new StringSelectMenuOptionBuilder()
					.setLabel('MC Server Support')
					.setDescription('Found a bug on the server? Or maybe you are here for something else.')
					.setValue('mc'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Store Support')
					.setDescription('You bought something from our store, and you did not got it?')
					.setValue('store'),
			);
			
		const row = new ActionRowBuilder()
			.addComponents(select);	

        let embed = new EmbedBuilder()
        .setTitle(`🎫 ・ Tickets`)
        .setDescription(`**Please select one of the options to open a ticket**`)
        .setColor('Blue')
        interaction.channel.send({embeds: [embed], components: [row]})

        interaction.reply({content: "Sent the embed!", ephemeral: true})
    },
};
