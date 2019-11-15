import React from "react";
import ArtCard from "../UI/ArtCard/ArtCard";
import styles from "./Gallery.module.css";

const Gallery = props => {
  // removeItem = id => {
  //   this.setState({
  //     artwork: this.state.artwork.filter(art => art.ArtId !== id)
  //   });
  // };

  const renderPaintings = columnNum => {
    const columnItems = [];


    let len = 0
    if(props.createdArtWorks)
      len = props.createdArtWorks.length

    console.log("gallery props", props);

    for (let i = columnNum - 1; i < len; i += 4) {
      const art = props.createdArtWorks[i];

      columnItems.push(
        <ArtCard
          className={styles.artCard}
          url={art.img.url}
          artist={art.artist}
          title={art.title}
          date={art.year}
          dimensions={art.diemsions}
          key={art._id}
        />
      );
    }
    return columnItems;
  };

  return (
    <div className={styles.row}>
      <div className={styles.column}>{renderPaintings(1)}</div>
      <div className={styles.column}>{renderPaintings(2)}</div>
      <div className={styles.column}>{renderPaintings(3)}</div>
      <div className={styles.column}>{renderPaintings(4)}</div>
    </div>
  );
};

export default Gallery;
