const { SlashCommandBuilder } = require('@discordjs/builders');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('color-premium')
        .setDescription('Change your bump embed color (Premium only)')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The hex color code for the embed')
                .setRequired(true)),
    async execute(interaction) {
        const color = interaction.options.getString('color');
        const guildId = interaction.guild.id;
        const serverSettings = await ServerSettings.findOne({ guildId });

        if (!serverSettings || !serverSettings.premium) {
            return interaction.reply('This command is only available for premium servers.');
        }

        serverSettings.embedColor = color;
        await serverSettings.save();
        interaction.reply(`Premium embed color set to ${color}`);
    }
};
