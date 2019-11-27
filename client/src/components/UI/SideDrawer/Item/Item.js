import React, {useState} from "react";
import classes from "./Item.module.css";

const Item = props => {
  const [selected, setSelected] = useState(false)
  const selectedHandler = (item) => {
    props.selectedHandler(item)
    setSelected(!selected)
  }
  
  return (
    <div>
      {selected === true ?
        <span className={classes.selectedItem} 
            onClick={() => selectedHandler(props.item)}>
            <img className={classes.icon} src={props.url} alt="" /> 
            {props.item}
        </span> :
        <span className={classes.item} 
            onClick={() => selectedHandler(props.item)}>
            <img src={props.url} alt="" className={classes.circle}/>
            {props.item}
        </span>}
      </div>
        
    )
}
export default Item
