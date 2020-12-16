const mongoose = require('../../database');

const DividaSchema = new mongoose.Schema({
    user: {
        type: Number,
        required: true,
    },
    motivo: {
        type: String,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Divida = mongoose.model('Divida', DividaSchema);
module.exports = Divida;