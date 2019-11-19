// const vision = require("@google-cloud/vision");

// // Creates a client
// const client = new vision.ImageAnnotatorClient();

// // static image files to be analyzed

// export const getColors = async imageFile => {
//   client
//     .imageProperties(imageFile)
//     .then(result => {
//       const colors = result[0].imagePropertiesAnnotation.dominantColors.colors;
//       console.log("Colors", colors);
//       return colors;
//     })
//     .catch(err => {
//       console.error("Error:", err);
//     });
// };
