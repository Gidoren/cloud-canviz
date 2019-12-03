import React from "react";
import styles from "./ArtCard.module.css";
import CardColors from '../../CardColors/CardColors'

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
