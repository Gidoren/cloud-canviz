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
        spouseFirstName: {
            type: String,
            required: false
        },
        spouseLastName: {
            type: String,
            required: false
        },
        phone_number: {
            type: String,
            required: true
        },
        mobile_phone: {
            type: String,
            required: false
        },
        other_phone: {
            type: String,
            required: false
        },
        company: {
            type: String,
            required: false
        },
        birthday: {
            type: String,
            required: false
        },
        website: {
            type: String,
            required: false
        },
        private_note: {
            type: String,
            required: false
        },
        street_address: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        state: {
            type: String,
            required: false
        },
        city: {
            type: String,
            required: false
        },
        zip: {
            type: String,
            required: false
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
            type: Schema.Types.ObjectId,
            ref: "user"
        }
    },
    { timestamps: true }
);

contactsSchema.virtual("fullName").get(function() {
    return this.firstName + " " + this.lastName;
});

module.exports = mongoose.model("contacts", contactsSchema)