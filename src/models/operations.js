const { Schema, model } = require("mongoose")

const operationModel = new Schema({
    concept: String,
    mount: Number,
    date: Date,
    type: String,
    category: String,
    operationStatus: {
        type: Boolean,
        default: false
    },
    owner: String,
    complete_at: {
        type: Date,
        default: null
    },
    create_at: {
        type: Date,
        default: new Date()
    }
})


operationModel.methods.isComplete = function() {
    return !this.operationStatus
}
module.exports = model('operations', operationModel)