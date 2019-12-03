import React, {useState} from "react";
import classes from "./Art.module.css";
import { Link } from "react-router-dom";
import {LIKE_ART, UNLIKE_ART} from '../../../grqphql/mutations'
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

/* props are properties that are passed from displayComment such as title, creator of the art.
Think of it as parameters in Functions.*/

const Art = props => {
  const likeArtHandler = () => {
    console.log(likeIcon.type.displ)
    console.log((<FavoriteIcon />).type)
    if(likeIcon.type.displayName !== (<FavoriteIcon />).type.displayName){
      const {data} = props.client.mutate({
        mutation: LIKE_ART,
        variables:{
          artId: props.artID
        }
      })
      .then(res => {
        console.log("like",res)
        setLikeIcon(<FavoriteIcon style={{color: '#011627'}} className={classes.heart} onClick={likeArtHandler}/>)
      })
    }
    else{
      const {data} = props.client.mutate({
        mutation: UNLIKE_ART,
        variables:{
          artId: props.artID
        }
      })
      .then(res => {
        console.log("unlike",res)
        setLikeIcon(<FavoriteBorderIcon className={classes.heart} onClick={likeArtHandler}/>)
      })
    }
    
  }
  const [likeIcon, setLikeIcon] = useState(
    (<FavoriteBorderIcon className={classes.heart} onClick={likeArtHandler}/>)
  )
  if(props.likedArtWorks !== null && likeIcon.type !== (<FavoriteIcon style={{color: '#011627'}} className={classes.heart} onClick={likeArtHandler}/>).type){
    props.likedArtWorks.map(likedArt => {
      if(likedArt[Object.keys(likedArt)[0]] === props.artID){
        setLikeIcon(<FavoriteIcon style={{color: '#011627'}} className={classes.heart} onClick={likeArtHandler}/>)
      }
    })
  }
  
  return (
    <div data-aos="fade-up">
      <img
        className={classes.img}
        src={props.artURL}
        alt={props.title}
      />
      <div
        className={classes.artInfo}
        width={classes.img.width}
      >
        {/* Always use link instead of <a> tag so it doesn't reload the page but rerenders the component. 
              We do this so that website don't do api calls again, or don't lose our website state.
              This is what is called single page Webapp(SPA). */}
        <Link to={{ pathname: props.link }} className={classes.link}>
          <p className={classes.username}>{props.fullname}</p>
        </Link>
    
        {props.likedArtWorks !== null ? likeIcon: ""}

        <p className={classes.title}>
          {props.title}, {props.year}
        </p>
        {/* <p className={classes.desc}>{props.desc}</p> */}
        {props.height && <p className={classes.dimensions}>
          {props.height}x{props.width}
        </p>}
        <p className={classes.dimensions}>
          {props.desc}
        </p>
      </div>
    </div>
  );
}
export default Art;
