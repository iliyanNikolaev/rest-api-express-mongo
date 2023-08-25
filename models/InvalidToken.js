const { Schema, model } = require('mongoose');


const invalidTokenSchema = new Schema({
    token: String,
    createdAt: Object
});

invalidTokenSchema.index( { "createdAt": 1 }, { expireAfterSeconds: 43200 } ); // 43200 seconds = 12 hours

const InvalidToken = model('Invalid Token', invalidTokenSchema);

module.exports = InvalidToken;