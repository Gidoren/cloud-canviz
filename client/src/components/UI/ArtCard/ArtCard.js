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

const _getCardStyles = (hexColor, pixelPercent) => {
  const style = {
    background: hexColor,
    width: `${pixelPercent}%`
  };
  return style;
};

const CardColors = props => {
  // var primaryColor = {
  //   background: `${props.primaryColor.hexColor}`
  // };
  // var secondaryColor = {
  //   background: `${props.secondaryColor.hexColor}`
  // };
  // var tertiaryColor = {
  //   background: `${props.tertiaryColor.hexColor}`
  // };
  // const colors = props.colors.map((color, index) => {
  //   <div
  //     className={styles.colorBox}
  //     key={index}
  //     style={_getCardStyles(color.hexColor, color.pixelPercent)}
  //   ></div>;
  // });

  return (
    <div className={styles.cardColors}>
      {props.colors.map((color, index) => {
        return (
          <div
            className={styles.colorBox}
            key={index}
            style={_getCardStyles(color.hexColor, color.pixelPercent)}
          ></div>
        );
      })}
    </div>
  );
};
//handleSetArtProps={this.handleSetArtProps} showModal={this.showModal}

const ArtCard = props => {
  const handleClick = () => {
    console.log("props.art: ", props.art);
    if (props.handleSetArtProps) {
      props.handleSetArtProps({ ...props.art });
    }
  };

  return (
    <div key={props.key} className={styles.cardContainer} onClick={handleClick}>
      <div data-aos="fade-up">
        <ArtImage {...props} />
        <CardInfo {...props} />
        <CardColors {...props} />
      </div>
    </div>
  );
};

export default ArtCard;
