// const fs = require('node:fs');
// const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./secrets.json');
const client = new Client ({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages]});
// client.commands = new Collection();
const archiver = require('./archiver');

client.once('ready', () => {
    console.log('Bot starting...');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('I AM GRANITE');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

client.on('messageCreate', message => {
		console.log("message received")
        console.log(message);
        archiver.send(message);
        }) 

client.login(token)










