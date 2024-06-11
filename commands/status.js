const { SlashCommandBuilder } = require('@discordjs/builders');
const { ownerID } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Change the bot\'s status')
        .addStringOption(option =>
            option.setName('status')
                .setDescription('The new status of the bot')
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user.id !== ownerID) {
            return interaction.reply('You do not have permission to use this command.');
        }

        const status = interaction.options.getString('status');
        interaction.client.user.setActivity(status, { type: 'WATCHING' });
        interaction.reply(`Status set to: ${status}`);
    }
};
