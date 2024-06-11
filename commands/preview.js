const { SlashCommandBuilder } = require('@discordjs/builders');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('preview')
        .setDescription('Shows your server bump embed'),
    async execute(interaction) {
        const guildId = interaction.guild.id;
        const serverSettings = await ServerSettings.findOne({ guildId });

        if (!serverSettings) {
            return interaction.reply('No settings found for this server.');
        }

        const embed = {
            color: serverSettings.embedColor || '#0099ff',
            title: 'Server Bump Preview',
            description: serverSettings.description || 'No description set.',
            timestamp: new Date(),
        };

        interaction.reply({ embeds: [embed] });
    }
};
