const client = require("../index");
const { PermissionsBitField, Routes, REST, User } = require('discord.js');
const fs = require("fs");
const colors = require("colors");

module.exports = (client) => {
  console.log("0------------------| Application commands Handler:".blue);
  const config = client.config

  let commands = [];

  fs.readdirSync('./commands/slash/').forEach((dir) => {
    console.log('[!] Started loading slash commands...'.yellow);
    const SlashCommands = fs.readdirSync(`./commands/slash/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of SlashCommands) {
      let pull = require(`../commands/slash/${dir}/${file}`);

      if (pull.name, pull.description, pull.type == 1) {
        client.slash_commands.set(pull.name, pull);
        console.log(`[HANDLER - SLASH] Loaded a file: ${pull.name} (#${client.slash_commands.size})`.brightGreen);

        commands.push({
          name: pull.name,
          description: pull.description,
          type: pull.type || 1,
          options: pull.options ? pull.options : null,
          default_permission: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
          default_member_permissions: pull.permissions.DEFAULT_MEMBER_PERMISSIONS ? PermissionsBitField.resolve(pull.permissions.DEFAULT_MEMBER_PERMISSIONS).toString() : null
        });

      } else {
        console.log(`[HANDLER - SLASH] Couldn't load the file ${file}, missing module name value, description, or type isn't 1.`.red)
        continue;
      };
    };
  });


  if (!config.Bot.ClientID) {
    console.log("[CRASH] You need to provide your bot ID in config.jymls!".red + "\n");
    return process.exit();
  };

  const rest = new REST({ version: '10' }).setToken(config.Bot.BotToken);

  (async () => {
    console.log('[HANDLER] Started registering all the application commands.'.yellow);

    try {
      await rest.put(
        Routes.applicationCommands(config.Bot.ClientID),
        { body: commands }
      );

      console.log('[HANDLER] Successfully registered all the application commands.'.brightGreen);
    } catch (err) {
      console.log(err);
    }
  })();
};
