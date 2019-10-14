const { DataSource } = require("apollo-datasource");

const ArtWork = require("../models/ArtWork");

class Art extends DataSource {
  constructor() {
    super();
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
        console.log(result);
        return { ...result._doc };
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = Art;
