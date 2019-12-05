import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import {
  Grid,
  Button,
  Paper,
  Typography,
  Box,
  IconButton
} from "@material-ui/core";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

import "react-alice-carousel/lib/alice-carousel.css";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
  //   extendedIcon: {
  //     marginRight: theme.spacing(1)
  //   }
}));

const CarouselItem = props => {
  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        // spacing={2}
        justify="center"
        alignContent="center"
        alignItems="center"
      >
        <Grid item container justify="center" xs={1}>
          <IconButton
            aria-label="prev-slide"
            className={classes.margin}
            size="medium"
            onClick={props.prevSlide}
          >
            <ArrowBackIosRoundedIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          xs={10}
          sm={6}
          justify="center"
          alignContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            alignItems="center"
            justify="center"
            alignContent="center"
            xs={12}
          >
            <div
              style={{
                height: "80vh",
                margin: "auto"
              }}
            >
              <img
                style={{
                  maxHeight: "100%",
                  maxWidth: "90%",
                  display: "block",
                  //   marginLeft: "auto",
                  //   marginRight: "auto"
                  margin: "auto"
                }}
                key={props.art._id}
                src={props.art.img.url}
              ></img>
            </div>
          </Grid>
        </Grid>
        {/* <Grid item xs={6} container justify="center"> */}
        <Grid item container direction="column" xs={10} sm={4}>
          <div style={{ overflowY: "auto ", margin: "0 auto" }}>
            <Grid item xs={12}>
              <Typography variant="h4">
                <Box lineHeight={2}>
                  {`${props.art.title}, ${props.art.year}`}
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5">
                <Box lineHeight={2}>{props.art.artist}</Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <Box
                  lineHeight={2}
                >{`${props.art.dimensions.height} x ${props.art.dimensions.width}"`}</Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                <Box lineHeight={2}>{props.art.medium}</Box>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {props.art.price && (
                <Typography variant="subtitle1">
                  <Box lineHeight={2}>{`$${props.art.price}`}</Box>
                </Typography>
              )}
            </Grid>
            {props.art.styles && (
              <Grid item xs={12}>
                <Typography variant="subtitle2">
                  <Box lineHeight={2}>{props.art.styles[0]}</Box>
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="subtitle2">
                <Box lineHeight={2}>{props.art.description}</Box>
              </Typography>
            </Grid>
            <Grid item container xs={12}>
              <Box lineHeight={4}>
                {props.art.colors.map(color => (
                  <div
                    style={{
                      display: "inline-block"
                    }}
                  >
                    <Grid item xs={1}>
                      <div
                        style={{
                          borderRadius: "50%",
                          backgroundColor: color.hexColor,
                          //   marginLeft: "3px",
                          marginRight: ".5rem",
                          height: "1.5rem",
                          width: "1.5rem"
                        }}
                      />
                    </Grid>
                  </div>
                ))}
              </Box>
            </Grid>
          </div>
        </Grid>
        <Grid
          item
          container
          xs={1}
          justify="center"
          alignContent="center"
          alignItems="center"
        >
          <Grid item container xs={12} justify="flex-end">
            <IconButton
              aria-label="next-slide"
              className={classes.margin}
              size="medium"
              onClick={props.nextSlide}
            >
              {/* <Box justifyContent="flex-end"> */}
              <ArrowForwardIosRoundedIcon fontSize="inherit" />
              {/* </Box> */}
            </IconButton>
          </Grid>
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

  getThumbStyles = i => {
    let style = {
      maxHeight: "2rem",
      maxWidth: "100%",
      marginLeft: "1rem",
      marginRight: "1rem",
      padding: "2px"
    };
    if (i === this.state.currentIndex) {
      style = {
        ...style,
        maxHeight: "2.5rem",
        outlineStyle: "solid",
        outlineColor: "#70afaf"
      };
    }
    return style;
  };

  thumbItem = (item, i) => (
    <span
      style={{ height: "20px", margin: "0 auto" }}
      onClick={() => this.slideTo(i)}
    >
      <img
        style={this.getThumbStyles(i)}
        key={item._id}
        src={item.img.url}
      ></img>
    </span>
  );

  galleryItems() {
    return this.props.art.map(art => (
      //   <img style={{ height: "50vh" }} key={art._id} src={art.img.url}></img>
      <CarouselItem
        art={art}
        nextSlide={this.slideNext}
        prevSlide={this.slidePrev}
      ></CarouselItem>
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
          //   fadeOutAnimation={true}
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
              {/* <Grid item xs={12}>
                <button onClick={() => this.slidePrev()}>Prev button</button>
                <button onClick={() => this.slideNext()}>Next button</button>
              </Grid> */}
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
