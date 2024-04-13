const { Client, Partials, Collection, GatewayIntentBits, Intents, EmbedBuilder } = require('discord.js');
const colors = require("colors");
const yaml = require('js-yaml');
const fs = require('fs')
const mongoose = require('mongoose')
const axios = require('axios');

let config = yaml.load(fs.readFileSync(`${process.cwd()}/config/config.yml`, 'utf8'))


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  presence: {
    activities: [{
      name: config.Bot.Activity || 'Overland Bot',
      type: 0
    }],
    status: 'dnd'
  }
});


require('http').createServer((req, res) => res.end('Ready.')).listen(3000);


const AuthenticationToken = config.Bot.BotToken;
if (!AuthenticationToken) {
  console.warn("[CRASH] A Bot token is required. Please specific it in the config".red)
  return process.exit();
};

client.config = config
client.slash_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();


module.exports = client;

[ "application_commands", "events"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});


async function checkStore() {
	const req = await axios.get('https://plugin.tebex.io/payments', {
		method: 'GET',
		headers: { 'X-Tebex-Secret': 'XXX', 'Content-Type': 'application/json' }
	});
	
	//console.log(req.data[0]["packages"][0]['name']);
	if (req.data[0]["status"] === 'Complete') {
		const date = new Date(req.data[0]["date"]);
		const username = req.data[0]["player"].name;
		const purchase = req.data[0]["packages"][0]['name'];
		
		const currentTime = new Date();
		const currentHour = currentTime.getHours();
		const currentMinute = currentTime.getMinutes();
		const currentSecond = currentTime.getSeconds();
		
		const parsedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
		
		const channel = client.channels.cache.get(config.Bot.storeChannelId);
		
		let embed = new EmbedBuilder()
		.setTitle(`🔨 ・ Store`)
		.setDescription(`**${username}** bought **${purchase}**\nThank you!`)
		.setColor('Blue')
		
		if (currentHour === parseInt(parsedTime.substr(0, 2), 10) && currentMinute === parseInt(parsedTime.substr(3, 2), 10) && currentSecond === parseInt(parsedTime.substr(6, 2), 10)) {
			channel.send({embeds: [embed]})		
		}
	}
}

mongoose.connect(config.Bot.MongoDBURL, {
  useNewURLParser: true,
  UseUnifiedTopology: true
}).then(() => {
		client.login(AuthenticationToken)
		setInterval(checkStore, 30000);
	})
  .catch((err) => {
    console.error("[CRASH] Something went wrong while connecting to your bot...");
    console.error("[CRASH] Error from Discord API:" + err);
    return process.exit();
  })
//process.on('unhandledRejection', async (err, promise) => {
//  if(err.toString().includes('DiscordAPIError[10008]: Unknown Message')) return
//  if(err.toString().includes("DiscordAPIError[10013]: Unknown User")) return;
//  if(err.toString.startsWith('TypeError: database.create(...).save is not a function')) return;
//  console.error(`[ANTI-CRASH] Unhandled Rejection: ${err}`.red);
//  console.error(promise);
//});
