const mongo = require('mongoose');

const ticketSchema = new mongo.Schema({
    GuildID: String,
    UserID: String,
    NumberOfMessages: Number,
})

module.exports = mongo.model('antispam', ticketSchema)