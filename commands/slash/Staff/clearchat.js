const { EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "clearchat",
    description: "Clear the chat",
    type: 1,
    staff: true,
    options: [
		{
			name: 'amount',
			description: 'The amount of messages you want to delete',
			type: ApplicationCommandOptionType.Integer,
			required: true,
		},
	],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "ManageMessages"
    },
    run: async (client, interaction, config) => {
		
		const amount = interaction.options.getInteger('amount');
		
		if (amount < 1 || amount == 0) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ ClearChat`)
			.setDescription(`Specified value should be greater than or equal to 1`)
			.setColor('Blue')
			
			interaction.reply({embeds: [embed], ephemeral: true})
			return;
		}
		
		const messages = await interaction.channel.messages.fetch({ limit: amount })
		
		interaction.channel.bulkDelete(messages, true).then(delMessages => {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ ClearChat`)
			.setDescription(`Cleared the ${amount} messages`)
			.setColor('Blue')
			
			interaction.reply({embeds: [embed]})
		});
    },
};
