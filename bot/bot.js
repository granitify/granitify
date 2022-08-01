// const fs = require('node:fs');
// const path = require('node:path');
const codeSearch = require('./codeSearch');
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
	console.log(message.content);
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
	
// 	const snippets = new Array;
// 	function snippetSearcher (text){
// 		let codeRegex = /(?<=[^`]|^)(`(?:``)?)([^`]+)\1(?=[^`]|$)/;
//     const string = text.split(" ");
// 	for (let i = 0; i<string.length; i++){
// 		if (string[i].match(codeRegex)){
// 			snippets.push(string[i])
// 		}
// 		}
//     return snippets;
//   }
	
	// snippetSearcher(content);
	const code = codeSearch(content);

	//data to parse for sending to backend
	const data = {
		"id": Number(id), 
		"user": author.username,
		"date": createdTimestamp,
		"text":content,
		"embeds": null,
		"attachments": null,
		"score": 0,
		"resources": {
			"linkUrls": urls,
			"imageUrls": attachmentArray,
			"codeSnippets": code[0].concat(code[1]),

		},
		"subject": null,
		"category": null,
	}

	archiver.send(data);
	
	// console.log(snippetSearcher("```Test 20 https://getcssscan.com/css-box-shadow-examples```"));
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







