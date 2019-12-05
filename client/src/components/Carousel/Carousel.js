import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import { Grid, Button, Paper, Typography } from "@material-ui/core";

import "react-alice-carousel/lib/alice-carousel.css";

const CarouselItem = props => {
  return (
    <div>
      <Grid
        container
        // spacing={2}
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid
          item
          container
          xs={8}
          justify="center"
          alignContent="stretch"
          alignItems="center"
        >
          <Grid item xs={12}>
            <div style={{ height: "80vh", margin: "0 auto" }}>
              <img
                style={{
                  maxHeight: "100%",
                  maxWidth: "90%"
                }}
                key={props.art._id}
                src={props.art.img.url}
              ></img>
            </div>
          </Grid>
        </Grid>
        {/* <Grid item xs={6} container justify="center"> */}
        <Grid item xs={4}>
          <div style={{ overflowY: "auto ", margin: "0 auto" }}>
            <Typography variant="h6">{props.art.title}</Typography>
            <Typography variant="subtitle1">{props.art.artist}</Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

class Carousel extends Component {
  //   items = this.props.art;

  state = {
    currentIndex: 0,
    responsive: {
      0: { items: 1 }
      //   1024: { items: 3 }
    },
    galleryItems: [],
    items: []
  };

  componentDidMount = () => {
    this.setState({
      //   ...this.state,
      currentIndex: parseInt(this.props.startIndex),
      galleryItems: this.galleryItems(),
      items: this.props.art
    });
  };

  slideTo = i => this.setState({ currentIndex: i });

  onSlideChanged = e => this.setState({ currentIndex: e.item });

  slideNext = () =>
    this.setState({ currentIndex: this.state.currentIndex + 1 });

  slidePrev = () =>
    this.setState({ currentIndex: this.state.currentIndex - 1 });

  thumbItem = (item, i) => (
    <span
      style={{ height: "20px", margin: "0 auto" }}
      onClick={() => this.slideTo(i)}
    >
      <img
        style={{
          maxHeight: "2rem",
          maxWidth: "100%",
          paddingLeft: "1rem",
          paddingRight: "1rem"
        }}
        key={item._id}
        src={item.img.url}
      ></img>
    </span>
  );

  galleryItems() {
    return this.props.art.map(art => (
      //   <img style={{ height: "50vh" }} key={art._id} src={art.img.url}></img>
      <CarouselItem art={art}></CarouselItem>
    ));
  }

  render() {
    console.log("cartousel getallart: ", this.props.art);
    const { galleryItems, responsive, currentIndex, items } = this.state;
    return (
      <div>
        <AliceCarousel
          //   infinite={false}
          dotsDisabled={true}
          buttonsDisabled={true}
          items={galleryItems}
          responsive={responsive}
          slideToIndex={currentIndex}
          onSlideChanged={this.onSlideChanged}
          startIndex={parseInt(currentIndex)}
        />
        <Grid
          container
          // spacing={2}
          justify="center"
          alignContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item xs={12}>
            <div>
              <ul>
                {this.state.items.map((item, i) => this.thumbItem(item, i))}
              </ul>
              <Grid item xs={12}>
                <button onClick={() => this.slidePrev()}>Prev button</button>
                <button onClick={() => this.slideNext()}>Next button</button>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Carousel;

// import React, { useState, useEffect } from "react";
// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";

// const Carousel = props => {
//   //   items = [1, 2, 3, 4, 5]

//   const [state, setState] = useState({
//     currentIndex: props.startIndex,
//     responsive: {
//       1024: { items: 3 }
//     }
//     // galleryItems: galleryItems()
//   });

//   const [items, setItems] = useState([...props.art]);

//   //   const useEffect = () => {
//   //     setItems([...props.art]);
//   //   },
//   //     [props.art];
//   useEffect(() => {
//     setItems([...props.art]);
//   }, [props.art]);

//   //   useEffect(() => {
//   //     setModalState({
//   //       artId: props.artId,
//   //       artTitle: props.artTitle,
//   //       artUrl: props.artUrl
//   //     });
//   //   }, [props.artId, props.artTitle, props.artUrl]);
//   //   state = {
//   //     currentIndex: 0,
//   //     responsive: { 1024: { items: 3 } },
//   //     galleryItems: this.galleryItems(),
//   //   }

//   const slideTo = i => setState({ ...state, currentIndex: i });

//   const onSlideChanged = e => setState({ ...state, currentIndex: e.item });

//   const slideNext = () =>
//     setState({ ...state, currentIndex: state.currentIndex + 1 });

//   const slidePrev = () =>
//     setState({ ...state, currentIndex: state.currentIndex - 1 });

//   const thumbItem = (item, i) => <span onClick={() => slideTo(i)}>* </span>;

//   const galleryItems = () => {
//     return items.map(i => <h2 key={i}> {i}</h2>);
//   };

//   //   render() {
//   //     const { galleryItems, responsive, currentIndex } = this.state
//   return (
//     <div>
//       <AliceCarousel
//         dotsDisabled={true}
//         buttonsDisabled={true}
//         items={galleryItems}
//         responsive={state.responsive}
//         slideToIndex={state.currentIndex}
//         onSlideChanged={onSlideChanged}
//       />

//       <ul>{items.map(thumbItem)}</ul>
//       <button onClick={() => slidePrev()}>Prev button</button>
//       <button onClick={() => slideNext()}>Next button</button>
//     </div>
//   );
// };
// // }

// export default Carousel;
