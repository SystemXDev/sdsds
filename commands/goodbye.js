const { SlashCommandBuilder } = require('@discordjs/builders');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('goodbye')
        .setDescription('Change your server goodbye channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel for goodbye messages')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const guildId = interaction.guild.id;
        let serverSettings = await ServerSettings.findOneAndUpdate(
            { guildId },
            { goodbyeChannel: channel.id },
            { upsert: true, new: true }
        );
        await serverSettings.save();
        interaction.reply(`Goodbye channel set to ${channel}`);
    }
};
