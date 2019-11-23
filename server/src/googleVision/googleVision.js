const vision = require("@google-cloud/vision");

// intialize credential for google cloud vision
const { gcvEmail, gcvKey } = require("../../config");

// Creates a client
const client = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: gcvEmail,
    private_key: gcvKey
  }
});

const _rgbaToHex = rgba => {
  rgba = rgba.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgba && rgba.length === 4
    ? "#" +
        ("0" + parseInt(rgba[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgba[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgba[3], 10).toString(16)).slice(-2)
    : "";
};

const _compareDominance = (a, b) => {
  if (a.pixelFraction < b.pixelFraction) {
    return -1;
  }
  if (a.pixelFraction > b.pixelFraction) {
    return 1;
  }
  return 0;
};

const _compareScore = (a, b) => {
  if (a.score > b.score) {
    return -1;
  }
  if (a.score < b.score) {
    return 1;
  }
  return 0;
};

const _decorateColors = colors => {
  var scoresSum =
    colors.reduce(function(sum, color) {
      return sum + color.score;
    }, 0) / 100;

  return colors.map(function(color) {
    color.percent = color.score / scoresSum;
    return color;
  });
};

const getColors = async imgUrl => {
  let hexColors = [];
  console.log("url in gcv: ", imgUrl);
  return await client
    .imageProperties(imgUrl)
    .then(result => {
      const colors = result[0].imagePropertiesAnnotation.dominantColors.colors;
      _decorateColors(colors);
      //console.log("Colors before sort", colors);
      colors.sort(_compareScore);
      //console.log("Colors after sort", colors);
      colors.forEach(currColor => {
        const hex = _rgbaToHex(
          `rgba(${currColor.color.red},${currColor.color.green},${currColor.color.blue},null)`
        );
        const percent = currColor.percent;
        const colorObj = {
          hexColor: hex,
          pixelPercent: percent
        };

        hexColors.push(colorObj);
      });
      //console.log("Hex Colors", hexColors);
      return hexColors;
    })
    .catch(err => {
      console.error("Error:", err);
    });
};

module.exports.getColors = getColors;
