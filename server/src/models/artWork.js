const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const artSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    artist: {
      type: String,
      required: false
    },
    artistCountry: {
      type: String,
      required: false
    },
    title: {
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
    category: {
      type: String,
      required: false
    },
    medium: {
      type: String,
      required: false
    },
    material: {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("artWork", artSchema);