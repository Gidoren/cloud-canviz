import React, { Component } from "react";
import { Card, CardMedia } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  cardContainer: {
    height: "100%"
  },
  card: {
    position: "relative"
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "black",
    backgroundColor: "white"
  }
};

class SplashCarousel extends Component {
  items = [
    {
      url:
        "https://cloud-canviz-photos-1.s3.us-west-1.amazonaws.com/paint7.jpg",
      style: "Abstract Paintings"
    },
    {
      url:
        "https://cloud-canviz-photos-1.s3.us-west-1.amazonaws.com/paint9.jpg",
      style: "Figurative Paintings"
    },
    {
      url:
        "https://cloud-canviz-photos-1.s3.us-west-1.amazonaws.com/IMG_9879.JPG",
      style: "Realism Paintings"
    },
    {
      url: "https://cloud-canviz-photos-1.s3.us-west-1.amazonaws.com/boca.jpg",
      style: "Sculpture"
    },
    {
      url:
        "https://cloud-canviz-photos-1.s3.us-west-1.amazonaws.com/photo1.jpeg",
      style: "Abstract Photography"
    }
  ];

  state = {
    currentIndex: 0,
    responsive: { 0: { items: 3 } },
    galleryItems: this.galleryItems()
  };

  slideTo = i => this.setState({ currentIndex: i });

  onSlideChanged = e => this.setState({ currentIndex: e.item });

  slideNext = () =>
    this.setState({ currentIndex: this.state.currentIndex + 1 });

  slidePrev = () =>
    this.setState({ currentIndex: this.state.currentIndex - 1 });

  thumbItem = (item, i) => <span onClick={() => this.slideTo(i)}>* </span>;

  galleryItems() {
    return this.items.map(item => (
      <div style={styles.cardContainer}>
        <Card style={styles.card}>
          <CardMedia image={item.url} style={styles.media} />
          <div style={styles.overlay}>{item.style}</div>
        </Card>
      </div>
    ));
  }

  render() {
    const { galleryItems, responsive, currentIndex } = this.state;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <AliceCarousel
          dotsDisabled={true}
          buttonsDisabled={true}
          items={galleryItems}
          responsive={responsive}
          slideToIndex={currentIndex}
          onSlideChanged={this.onSlideChanged}
        />

        <ul>{this.items.map(this.thumbItem)}</ul>
        <button onClick={() => this.slidePrev()}>Prev button</button>
        <button onClick={() => this.slideNext()}>Next button</button>
      </div>
    );
  }
}

export default SplashCarousel;
