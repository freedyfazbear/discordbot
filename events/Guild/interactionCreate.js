const { EmbedBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
  name: "interactionCreate"
};

client.on('interactionCreate', async (interaction) => {
  const config = client.config
  if (interaction.isChatInputCommand()) {
    const command = client.slash_commands.get(interaction.commandName);

    if (!command) return;

    if(command.staff) {
      if(!interaction.member.roles.cache.get(client.config.Tickets.ticketStaffID)) {
        return interaction.reply({ ephemeral: true, content: 'You are missing permissions.'})
    }
  }

    try {
      command.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  };

  if (interaction.isUserContextMenuCommand()) { 
    const command = client.user_commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  };

  if (interaction.isMessageContextMenuCommand()) {
    const command = client.message_commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction, config);
    } catch (e) {
      console.error(e)
    };
  };
});

