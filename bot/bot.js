// const fs = require('node:fs');
// const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client ({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages]});
// client.commands = new Collection();
const archiver = require('./archiver');

let token;
if (!process.env.BOT_TOKEN) {
  token = require('./secrets.json').token;
}

const TOKEN = process.env.BOT_TOKEN || token;

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

	let urlRegex = /(https?:\/\/[^\s]+)/g;
	const urls = new Array;
	const string = content.split(" ");
	for (let i = 0; i<string.length; i++){
		if (string[i].match(urlRegex)){
			urls.push(string[i])
		}
	}
	
	const snippets = new Array;
	function snippetSearcher (text){
		let codeRegex = /((```)?)([^`]+)\1(?=[^`]|$)/;
    const string = text.split(" ");
	for (let i = 0; i<string.length; i++){
		if (string[i].match(codeRegex)){
			snippets.push(string[i])
		}
		}
    return snippets;
  }
	
	snippetSearcher(content);

	//data to parse for sending to backend
	const data = {
		"id":id, 
		"user": author.username,
		"date": createdTimestamp,
		"text":content,
		"embed": null,
		"attachments": null,
		"score": 0,
		"resource": {
			"linkUrls": urls,
			"imageUrls": attachmentArray,
			"codeSnippets": snippets,

		},
		"subject": null,
		"category": null,
	}

	archiver.send(data);
	console.log(data);
});

	//Testing--------
		// console.log(attachments);
		// console.log(guildId);
		// console.log(channelId);
		// console.log (content, id)
		// console.log(author.username);


client.login(TOKEN)


//Message.guildId -- server ID
///Message.channelId -- channel ID
//Message.content	--content (URLS, block of code)
//Message.id	--message id (for stretch feature for msg updates)
//Message.author.username	--username
//Message.attachments --Collection (# identify how many attachement)







