const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const ServerSettings = require('../models/serverSettings');

const COOLDOWN_NON_PREMIUM = 60 * 60 * 1000;
const COOLDOWN_PREMIUM = 5 * 60 * 1000;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bump')
        .setDescription('Bumps your server'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        let userServerSettings = await ServerSettings.findOne({ guildId });

        if (!userServerSettings) {
            userServerSettings = new ServerSettings({ guildId });
            await userServerSettings.save();
        }

        const now = new Date();
        const cooldown = userServerSettings.premium ? COOLDOWN_PREMIUM : COOLDOWN_NON_PREMIUM;
        if (userServerSettings.lastBump && now - userServerSettings.lastBump < cooldown) {
            return interaction.reply(`You need to wait ${userServerSettings.premium ? '5 minutes' : '1 hour'} between bumps.`);
        }

        const bumpMessage = userServerSettings.description || 'Join our server for awesome content!';


        const userColor = userServerSettings.embedColor || '#0099ff';

        const guilds = interaction.client.guilds.cache.values();


        for (const guild of guilds) {
            const guildId = guild.id;

            const serverSettings = await ServerSettings.findOne({ guildId });


            const advertisementChannelId = serverSettings?.advertisementChannel;
            if (!advertisementChannelId) {
                console.log(`Skipping bump for server ${guild.name}. Advertisement channel not set.`);
                continue;
            }


            const advertisementChannel = guild.channels.cache.get(advertisementChannelId);

            const bumpEmbed = new MessageEmbed()
                .setTitle('System X Server Bumps')
                .setColor(userColor)
                .setDescription(bumpMessage)
                .setFooter('Made by System X');
            advertisementChannel.send({ embeds: [bumpEmbed] })
                .then(() => console.log(`Bump sent to server ${guild.name}`))
                .catch(error => console.error(`Error sending bump message for server ${guild.name}:`, error));
        }

        userServerSettings.lastBump = now;
        await userServerSettings.save();

        interaction.reply('Bump sent to all servers.');
    }
};
