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

  getAllArt(offset, limit) {
    return ArtWork.find().skip(offset).limit(limit).sort('-createdAt').populate('creator')
      .then(artworks => {
        return artworks.map(artwork=>{
          return {...artwork._doc}
        })
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
      ...args.artInput,
      creator: "5db3cd2f048b822783b5785d"
    });
    let createdArt
    return art
      .save()
      .then(result => {
        // Farris I added these console logs so that you could see how to access the current user from the context
        // to get the id you would just need to do this.context.user._id and use that id to find the user by id
        // with User.findById( ) and pass the id in, then you can push the id of result._id onto the users creaetedArt array
        console.log("data returned from createArt", result);
        const user = this.context.user;
        console.log("user from context", user);
        
        {/* save result to return it later */}
        createdArt = { ...result._doc };
        {/* creator id is accessed from Art
         Finds the user and pushes the new artwork in createdArtWork array*/}
        return User.findById(createdArt.creator._id)
      })
      .then(user => {
        console.log(user)
        user.createdArtWorks.push(art)
        return user.save()
      })
      .then(res => {
        return createdArt
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
}

module.exports = Art;
