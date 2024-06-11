const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');
const ServerSettings = require('../models/serverSettings');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setadminrole')
        .setDescription('Set the role that can access premium commands')
        .addRoleOption(option =>
            option.setName('admin-role')
                .setDescription('The role that can use premium commands')
                .setRequired(true)),
    async execute(interaction) {
        const member = interaction.guild.members.cache.get(interaction.user.id);
        if (!member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return interaction.reply('You need to be a server administrator to use this command.');
        }

        const adminRole = interaction.options.getRole('admin-role');
        const guildId = interaction.guild.id;
        let serverSettings = await ServerSettings.findOne({ guildId });
        if (!serverSettings) {
            serverSettings = new ServerSettings({ guildId });
        }
        serverSettings.adminRoleId = adminRole.id;
        await serverSettings.save();

        interaction.reply(`Admin role set to: ${adminRole.name}`);
    }
};
