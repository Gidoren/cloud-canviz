const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactsSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
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
        },
        lead_owner: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

contactsSchema.virtual("fullName").get(function() {
    return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("contacts", contactsSchema)