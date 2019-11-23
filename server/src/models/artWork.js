// Art model for mongoDB
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
    description: {
      type: String,
      required: false
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
    ],
    likers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user"
      }
    ],
    primaryColor: {
      hexColor: {
        type: String,
        required: false
      },
      pixelPercent: {
        type: Number,
        required: false
      }
    },
    secondaryColor: {
      hexColor: {
        type: String,
        required: false
      },
      pixelPercent: {
        type: Number,
        required: false
      }
    },
    tertiaryColor: {
      hexColor: {
        type: String,
        required: false
      },
      pixelPercent: {
        type: Number,
        required: false
      }
    },
    colors: [
      {
        hexColor: {
          type: String,
          required: false
        },
        pixelPercent: {
          type: Number,
          required: false
        }
      }
    ]
  },
  { timestamps: true }
);

// this pre function applies middleware to any artwork document that gets .remove() called on it
// in this case we are:
//   1) setting art variable equal to this art document that is being removed
//   2) updating any user model documents that match the query { likedArtWorks}
//
artSchema.pre("remove", function(next) {
  var art = this;
  return art
    .model("user")
    .update(
      { $or: [{ likedArtWorks: art._id }, { createdArtWorks: art._id }] },
      { $pull: { likedArtWorks: art._id, createdArtWorks: art._id } },
      { multi: true }
    );
  // TODO pull from contacts referenced art ids once we add to schmea
});

module.exports = mongoose.model("artWork", artSchema);
