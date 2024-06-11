const mongoose = require('mongoose');

const serverSettingsSchema = new mongoose.Schema({
    guildId: { type: String, required: true, unique: true },
    advertisementChannel: String,
    embedColor: String,
    description: String,
    welcomeChannel: String,
    goodbyeChannel: String,
    prefix: String,
    premium: { type: Boolean, default: false },
    lastBump: Date
});

module.exports = mongoose.model('ServerSettings', serverSettingsSchema);
