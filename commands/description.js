const { SlashCommandBuilder } = require('@discordjs/builders');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('description')
        .setDescription('Change your server description')
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of your server')
                .setRequired(true)),
    async execute(interaction) {
        const description = interaction.options.getString('description');
        const guildId = interaction.guild.id;
        let serverSettings = await ServerSettings.findOneAndUpdate(
            { guildId },
            { description: description },
            { upsert: true, new: true }
        );
        await serverSettings.save();
        interaction.reply(`Description set to: ${description}`);
    }
};
