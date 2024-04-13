const { EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick specified user",
    type: 1,
    staff: true,
    options: [
		{
			name: 'target',
			description: 'The user you want to kick',
			type: ApplicationCommandOptionType.Mentionable,
			required: true,
		},
		{
			name: 'reason',
			description: 'The reason why you want to kick him',
			type: ApplicationCommandOptionType.String,
			required: true,
		},
	],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "KickMembers"
    },
    run: async (client, interaction, config) => {
		await interaction.deferReply({ephemeral: true})
		
		const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason');
		
		if (target.id === interaction.guild.ownerId) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Kick`)
			.setDescription(`Error:  You can not kick the server owner!`)
			.setColor('Blue')
			
			interaction.channel.send({embeds: [embed]})
		}
		
		const targetUser = await interaction.guild.members.fetch(target.id);
		const targetRolePosition = targetUser.roles.highest;
		const requestUserRolePosition = interaction.member.roles.highest.position;
		const botRolePosition = interaction.guild.members.me.roles.highest.position;
		
		if (targetRolePosition >= requestUserRolePosition) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Kick`)
			.setDescription(`Error:  You can not kick that user because he have the same/higher rank than you!`)
			.setColor('Blue')
			
			interaction.channel.send({embeds: [embed]})
			return;
		}
		
		if (targetRolePosition >= botRolePosition) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Kick`)
			.setDescription(`Error:  You can not kick that user because he have the same/higher rank than you!`)
			.setColor('Blue')
			
			interaction.channel.send({embeds: [embed]})
			return;
		}
		
		let embed = new EmbedBuilder()
        .setTitle(`🔨 ・ Kick`)
        .setDescription(`Kicked ${target} for: ${reason}`)
        .setColor('Blue')
        interaction.channel.send({embeds: [embed]})
		
		await interaction.guild.members.kick(target, {reason: target });
    },
};
