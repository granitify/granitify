// const fs = require('node:fs');
// const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./secrets.json');
const client = new Client ({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages]});
// client.commands = new Collection();

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


//bot read message and collect info for sending to backend MongoDB
client.on('messageCreate', message => {
	const {guildId, channelId, content, id, author, attachments, createdTimestamp} = message;
	console.log("message received");
	let attachment;
	const attachmentArray = new Array;
	for (const id of attachments.keys()) {
	attachment = attachments.get(id);
	attachmentArray.push(attachment.url)
	// console.log(`Attachment ${id}, url: ${attachment.url}`);---Testing
		}
	//data to parse for sending to backend
	const data = {id, content, author: author.username, createdTimestamp, attachments:attachmentArray}
	console.log(data)
})
	//Testing--------
		// console.log(attachments);
		// console.log(guildId);
		// console.log(channelId);
		// console.log (content, id)
		// console.log(author.username);
      

client.login(token)


//Message.guildId -- server ID
///Message.channelId -- channel ID
//Message.content	--content (URLS, block of code)
//Message.id	--message id (for stretch feature for msg updates)
//Message.author.username	--username
//Message.attachments --Collection (# identify how many attachement)










