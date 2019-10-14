const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artSchema = new Schema({
    artist: {
        type: String,
        required: false
    },
    artistUserID: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    medium: {
        type: String,
        required: false
    },
    year: {
        type: String,
        required: false
    },
    img: {
        url: {
            type: String,
            required: false
        }
    },
    dimensions: {
        height: {
            type: Number,
            required: false
        },
        width: {
            type: Number,
            required: false
        }
    },
    price: {
        type: String,
        required: false
    },
    series: {
        type: String,
        required: false
    },
    styles: [
        {
            type: String,
            required: false
        }
    ],
    tags: [
        {
            type: String,
            required: false
        }
    ]
});

module.exports = mongoose.model("ArtWork", artSchema);

//   ART SHEMA FOR REFERENCE
//   input ArtInput {
//     artist: String
//     artistUserID: String!
//     title: String
//     medium: String
//     year: String
//     img: Image
//     dimensions: Dimensions
//     price: String
//     series: String
//     styles: [String!]
//     tags: [String!]
// }

// type Image {
//     url: String!
// }

// type Dimensions {
//     height: String
//     width: String
// }