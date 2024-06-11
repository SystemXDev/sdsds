const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Get my Invite link :3'),
    async execute(interaction) {
        const inviteLink = 'https://discord.com/api/oauth2/authorize?client_id=1249899723226091531&permissions=8&scope=bot%20applications.commands';

        // Create the invite embed
        const inviteEmbed = new MessageEmbed()
            .setTitle('Invite System X Server Bump To Your Discord Server Now')
            .setDescription(`[Click here to invite me to your server](${inviteLink})`)
            .setColor('#0099ff');

        // Send the invite embed
        interaction.reply({ embeds: [inviteEmbed] });
    }
};
