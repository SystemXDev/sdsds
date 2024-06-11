const { SlashCommandBuilder } = require('@discordjs/builders');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Change your server advertisement channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel for server advertisement')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const guildId = interaction.guild.id;
        let serverSettings = await ServerSettings.findOneAndUpdate(
            { guildId },
            { advertisementChannel: channel.id },
            { upsert: true, new: true }
        );
        await serverSettings.save();
        interaction.reply(`Advertisement channel set to ${channel}`);
    }
};
