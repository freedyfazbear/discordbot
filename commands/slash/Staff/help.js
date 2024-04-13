const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "View my commands!",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "Administrator"
    },
    run: async (client, interaction, config) => {

        const staffCommandsList = []
        readdirSync(`${process.cwd()}/commands/slash/Staff`).forEach((file) => {
            const filen = require(`${process.cwd()}/commands/slash/Staff/${file}`);
            const name = `\`${filen.name}\``;
            staffCommandsList.push(name);
        });
        
        const helpEmbed = new EmbedBuilder()
        .setTitle(`${client.user.username} Slash Commands`)
        .setDescription(`Hey, \`${interaction.user.username}\`! \n**Total SlashCommands:** \`${client.slash_commands.size}\``)
        .setColor("BLUE")
        .setFooter({text: `Ran by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL()})
        .setTimestamp(Date.now())
        .addFields(
            {   name: '🤸 - Staff Slash Commands', value: staffCommandsList.map((data) => `${data}`).join(", "), inline: true}, 
            )

        interaction.reply({embeds: [helpEmbed]})
    },
};
