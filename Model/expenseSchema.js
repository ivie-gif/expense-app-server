const mongoose = require('mongoose')

// create schema
const expenseScheme = new mongoose.Schema({
    name: String,
    amount: Number,
    date: String,
    invoice: String,
})

module.exports = expenseScheme