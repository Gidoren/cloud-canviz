import React from "react";
import styles from "./ArtCard.module.css";

const ArtImage = ({ url, title, key }) => {
  return <img key={key} className={styles.artImage} src={url} alt={title} />;
};

const CardInfo = ({ artist, title, date, dimensions, key }) => {
  return (
    <div className={styles.cardInfo}>
      <div data-aos="zoom-in" className={styles.cardText}>
        <p className={styles.artist}>{artist}</p>
        <p className={styles.title}>{`${title}, ${date}`}</p>
        <p
          className={styles.dimensions}
        >{`${dimensions.height}" x ${dimensions.width}"`}</p>
      </div>
    </div>
  );
};

const CardColors = props => {
  var primaryColor = {
    background: `${props.primaryColor.hexColor}`
  };
  var secondaryColor = {
    background: `${props.secondaryColor.hexColor}`
  };
  var tertiaryColor = {
    background: `${props.tertiaryColor.hexColor}`
  };

  return (
    <div className={styles.cardColors}>
      <div className={styles.colorBox} style={primaryColor}></div>
      <div className={styles.colorBox} style={secondaryColor}></div>
      <div className={styles.colorBox} style={tertiaryColor}></div>
    </div>
  );
};

const ArtCard = props => {
  return (
    <div key={props.key} className={styles.cardContainer}>
      <div data-aos="fade-up">
        <ArtImage {...props} />
        <CardInfo {...props} />
        <CardColors {...props} />
      </div>
    </div>
  );
};

export default ArtCard;
