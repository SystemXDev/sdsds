const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows you all my Commands'),
    async execute(interaction) {
        const commandsList = `
        **/bump** - Bumps your server
        **/channel** - Change your server advertisement channel
        **/color** - Change your bump embed color
        **/description** - Change your server description
        **/goodbye** - Change your server goodbye channel
        **/help** - Shows you all my Commands
        **/invite** - Get my Invite link :3
        **/preview** - Shows your server bump embed
        **/welcome** - Change your server welcome channel
        `;
        interaction.reply(commandsList);
    }
};
