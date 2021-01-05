const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
        trim: true,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Basket = mongoose.model("Basket", basketSchema);

module.exports = Basket;