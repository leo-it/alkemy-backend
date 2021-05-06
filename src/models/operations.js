const { Schema, model } = require("mongoose")

const operationModel = new Schema({
    concept: String,
    mount: Number,
    date: Date,
    type: String,
    category: String

})

module.exports = model('operations', operationModel)