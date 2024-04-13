const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require("fs");
const database = require('../../../Schemas/ticketHandler')

module.exports = {
    name: "close",
    description: "Close a ticket",
    type: 1,
    staff: true,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {
        const db = await database.findOne({ ChannelID: interaction.channel.id})

        let embed = new EmbedBuilder()
        .setTitle(':x: Closing Ticket')
        .setDescription(`This ticket will be closed in \`5\` seconds.`)
        .setColor('Blue')

        interaction.reply({embeds: [embed]})

        setTimeout(async () => {
            if(db) {
                await database.findOneAndDelete({ChannelID: interaction.channel.id})
                interaction.channel.delete()
            } 
            else interaction.channel.delete()
        }, 5000)
    },
};
