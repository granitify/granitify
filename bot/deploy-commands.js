const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } =require('@discordjs/rest');
const {applicationId, guildId, token} = require('./secrets.json');

const commands = [	
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(applicationId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);

console.log('command-deployed')