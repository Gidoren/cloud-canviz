import React, { useState } from "react";
import classes from "./Art.module.css";
import { Link } from "react-router-dom";
import { LIKE_ART, UNLIKE_ART } from "../../../grqphql/mutations";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import CardColors from "../../CardColors/CardColors";

/* props are properties that are passed from displayComment such as title, creator of the art.
Think of it as parameters in Functions.*/

const Art = props => {
  const [likedArtWorks, setLikedArtWorks] = useState(props.likedArtWorks);
  const [likeIcon, setLikeIcon] = useState(0);
  const likeArtHandler = () => {
    if (likeIcon === 0) {
      const { data, refetch } = props.client
        .mutate({
          mutation: LIKE_ART,
          variables: {
            artId: props.artID
          }
        })
        .then(res => {
          console.log("like", res);
          console.log(likedArtWorks);
          setLikeIcon(1);
        });
    } else {
      const { data, refetch } = props.client
        .mutate({
          mutation: UNLIKE_ART,
          variables: {
            artId: props.artID
          }
        })
        .then(res => {
          console.log("unlike", res);
          console.log(likedArtWorks);
          setLikedArtWorks(
            props.likedArtWorks.filter(i => i._id !== props.artID)
          );
          setLikeIcon(0);
          console.log(props.artID);
          console.log(likedArtWorks);
        });
    }
  };
  if (likedArtWorks !== null && likeIcon !== 1) {
    likedArtWorks.map(likedArt => {
      if (likedArt[Object.keys(likedArt)[0]] === props.artID) {
        setLikeIcon(1);
      }
    });
  }

  return (
    <div data-aos="fade-up">
      <img
        className={classes.img}
        onClick={() => props.click(props.index)}
        src={props.artURL}
        alt={props.title}
      />
      <div className={classes.artInfo} width={classes.img.width}>
        {/* Always use link instead of <a> tag so it doesn't reload the page but rerenders the component. 
              We do this so that website don't do api calls again, or don't lose our website state.
              This is what is called single page Webapp(SPA). */}

        <Link
          to={{ pathname: props.link }}
          params={{ userid: props.link }}
          className={classes.link}
        >
          <p className={classes.username}>{props.fullname}</p>
        </Link>

        {likedArtWorks !== null ? (
          likeIcon === 0 ? (
            <FavoriteBorderIcon
              className={classes.heart}
              onClick={likeArtHandler}
            />
          ) : (
            <FavoriteIcon className={classes.heart} onClick={likeArtHandler} />
          )
        ) : (
          ""
        )}

        <p className={classes.title}>
          {props.title}, {props.year}
        </p>
        {/* <p className={classes.desc}>{props.desc}</p> */}
        {props.height && (
          <p className={classes.dimensions}>
            {props.height}x{props.width}
          </p>
        )}
        <p className={classes.dimensions}>{props.desc}</p>
      </div>
    </div>
  );
};
export default Art;
