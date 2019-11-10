const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactsSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone_number: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        lead_status: {
            type: String,
            required: false
        },
        lead_value: {
            type: Number,
            required: false
        } 
    },
    { timestamps: true }
);

module.exports = mongoose.model("contacts", contactsSchema)