const { EmbedBuilder, ApplicationCommandOptionType, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const fs = require('fs')
const yaml = require('js-yaml');
let config = yaml.load(fs.readFileSync(`${process.cwd()}/config/config.yml`, 'utf8'))

module.exports = {
    name: "mute",
    description: "Mute specified user",
    type: 1,
    staff: true,
    options: [
		{
			name: 'target',
			description: 'The user you want to mute',
			type: ApplicationCommandOptionType.Mentionable,
			required: true,
		},
	],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "ManageMessages"
    },
    run: async (client, interaction, config) => {
		
		const target = interaction.options.getUser('target');
		
		const role = interaction.guild.roles.cache.find((r) => r.id === config.Bot.muteCommandIdRole);
		
		const member = interaction.guild.members.cache.get(target.id);
		
		if (!role) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Mute`)
			.setDescription(`Mute role does not exist!`)
			.setColor('Blue')
			
			interaction.reply({embeds: [embed], ephemeral: true})
			return;
		}
		
		if (member.roles.cache.has(role.id)) {
			let embed = new EmbedBuilder()
			.setTitle(`🔨 ・ Mute`)
			.setDescription(`This user is already muted!`)
			.setColor('Blue')
			
			interaction.reply({embeds: [embed], ephemeral: true})
			return;
		}
		
		await member.roles.add(role);
		
		let embed = new EmbedBuilder()
		.setTitle(`🔨 ・ Mute`)
		.setDescription(`Muted the ${target}`)
		.setColor('Blue')
		
		interaction.reply({embeds: [embed]})
    },
};
