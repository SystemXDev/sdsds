const { SlashCommandBuilder } = require('@discordjs/builders');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prefix')
        .setDescription('Change your server prefix')
        .addStringOption(option =>
            option.setName('prefix')
                .setDescription('The prefix for bot commands')
                .setRequired(true)),
    async execute(interaction) {
        const prefix = interaction.options.getString('prefix');
        const guildId = interaction.guild.id;
        let serverSettings = await ServerSettings.findOneAndUpdate(
            { guildId },
            { prefix: prefix },
            { upsert: true, new: true }
        );
        await serverSettings.save();
        interaction.reply(`Prefix set to: ${prefix}`);
    }
};
