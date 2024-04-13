const mongo = require('mongoose');

const ticketSchema = new mongo.Schema({
    GuildID: String,
    UserID: String,
    ChannelID: String,
    isHandled: Boolean,
    HandlerID: String,
    HandlerTag: String
})

module.exports = mongo.model('Tickets', ticketSchema)