const { SlashCommandBuilder } = require('@discordjs/builders');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Change your server welcome channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel for welcome messages')
                .setRequired(true)),
    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const guildId = interaction.guild.id;
        let serverSettings = await ServerSettings.findOneAndUpdate(
            { guildId },
            { welcomeChannel: channel.id },
            { upsert: true, new: true }
        );
        await serverSettings.save();
        interaction.reply(`Welcome channel set to ${channel}`);
    }
};
