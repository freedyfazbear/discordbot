const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder } = require("discord.js");

const fs = require('fs')
const yaml = require('js-yaml');
let config = yaml.load(fs.readFileSync(`${process.cwd()}/config/config.yml`, 'utf8'))

const axios = require('axios');

module.exports = {
    name: "test",
    description: "test",
    type: 1,
    staff: true,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config) => {
		
    },
};
