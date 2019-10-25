const { DataSource } = require("apollo-datasource");
const User = require("../models/user");
const ArtWork = require("../models/artWork");

class Art extends DataSource {
  constructor() {
    super();
  }
  // initialize context
  initialize(config) {
    this.context = config.context;
  }

  getAllArt() {
    return ArtWork.find()
      .then(artworks => {
        return artworks.map(art => {
          return { ...art._doc };
        });
      })
      .catch(err => {
        throw err;
      });
  }

  // createArt
  // saves art data
  // adds userId of creator to creator field
  createArt(args) {
    const art = new ArtWork({
      artist: args.artInput.artist,
      artistUserID: args.artInput.artistUserID,
      title: args.artInput.title,
      medium: args.artInput.medium,
      year: args.artInput.year,
      img: args.artInput.img,
      dimensions: args.artInput.dimensions,
      price: args.artInput.price,
      series: args.artInput.series,
      styles: args.artInput.styles,
      tags: args.artInput.tags
    });
    return art
      .save()
      .then(result => {
        // Farris I added these console logs so that you could see how to access the current user from the context
        // to get the id you would just need to do this.context.user._id and use that id to find the user by id
        // with User.findById( ) and pass the id in, then you can push the id of result._id onto the users creaetedArt array
        console.log("data returned from createArt", result);
        const user = this.context.user;
        console.log("user from context", user);

        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = Art;
