const { EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban specified user",
    type: 1,
    staff: true,
    options: [
		{
			name: 'target',
			description: 'The user you want to ban',
			type: ApplicationCommandOptionType.Mentionable,
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason why you want to ban him',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "BanMembers"
    },
    run: async (client, interaction, config) => {
		
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason');
		
		if (target.id === interaction.guild.ownerId) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Ban`)
			.setDescription(`Error:  You can not ban the server owner!`)
			.setColor('Blue')
			
			interaction.reply({embeds: [embed], ephemeral: true})
			return;
		}
		
		const targetUser = await interaction.guild.members.fetch(target.id);
		const targetRolePosition = targetUser.roles.highest.position;
		const requestUserRolePosition = interaction.member.roles.highest.position;
		const botRolePosition = interaction.guild.members.me.roles.highest.position;
		
		if (targetRolePosition >= requestUserRolePosition) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Ban`)
			.setDescription(`Error:  You can not ban that user because he have the same/higher rank than you!`)
			.setColor('Blue')
			
			interaction.reply({embeds: [embed], ephemeral: true})
			return;
		}
		
		if (targetRolePosition >= botRolePosition) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Ban`)
			.setDescription(`Error:  You can not ban that user because he have the same/higher rank than you!`)
			.setColor('Blue')
			
			interaction.reply({embeds: [embed], ephemeral: true})
			return;
		}
		
		let embed = new EmbedBuilder()
        .setTitle(`🔨 ・ Ban`)
        .setDescription(`Banned ${target} for: ${reason}`)
        .setColor('Blue')
        interaction.reply({embeds: [embed]})
		
		await interaction.guild.members.ban(target, {reason: target });
    },
};
