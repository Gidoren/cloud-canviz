import React, {useState} from "react";
import classes from "./OptionsList.module.css";
import Painting from "../../assets/images/painting.png"
import Photography from "../../assets/images/photography.png"
import Drawing from "../../assets/images/drawing.png"
import MixedMedia from "../../assets/images/mixedmedia.png"
import Option from "../../assets/images/option.png"
import Print from "../../assets/images/print.png"
// import { tsPropertySignature } from '@babel/types';

const OptionsList = props => {
  const [selected, setSelected] = useState([])
  const categorySelectedHandler = (option) => {
    props.categoryHandler(option)
    console.log(selected)
    if(selected.includes(option)){
      setSelected(selected.filter(i => i !== option))
    }
    else{
      setSelected(selected.concat(option))
    }
    
  }
  const styleSelectedHandler = (option) => {
    props.styleHandler(option)
    console.log(selected)
    if(selected.includes(option)){
      setSelected(selected.filter(i => i !== option))
    }
    else{
      setSelected(selected.concat(option))
    }
    
  }
  
  return (
    <div>
      {selected.includes(props.option1) ?
          props.option1 == "Painting" ?
            <span className={classes.selectedItem} 
              onClick={() => categorySelectedHandler(props.option1)}>
                <img className={classes.icon} src={Painting} alt="" /> 
                {props.option1}
            </span> :
            <span className={classes.selectedItem} 
              onClick={() => styleSelectedHandler(props.option1)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option1}
            </span>
          : 
          props.option1 == "Painting" ?
            <span className={classes.item} 
              onClick={() => categorySelectedHandler(props.option1)}>
                <img className={classes.icon} src={Painting} alt="" /> 
                {props.option1}
            </span> :
            <span className={classes.item} 
              onClick={() => styleSelectedHandler(props.option1)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option1}
            </span>}
      
        
      {selected.includes(props.option2) ? 
          props.option2 == "Photography" ?
            <span className={classes.selectedItem} 
              onClick={() => categorySelectedHandler(props.option2)}>
                <img className={classes.icon} src={Photography} alt="" /> 
                {props.option2}
            </span> :
            <span className={classes.selectedItem} 
              onClick={() => styleSelectedHandler(props.option2)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option2}
            </span>
          : 
          props.option2 == "Photography" ?
            <span className={classes.item} 
              onClick={() => categorySelectedHandler(props.option2)}>
                <img className={classes.icon} src={Photography} alt="" /> 
                {props.option2}
            </span> :
            <span className={classes.item} 
              onClick={() => styleSelectedHandler(props.option2)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option2}
            </span>}


      {selected.includes(props.option3) ? 
        props.option3 == "Drawing" ?
          <span className={classes.selectedItem} 
            onClick={() => categorySelectedHandler(props.option3)}>
              <img className={classes.icon} src={Drawing} alt="" /> 
              {props.option3}
          </span> :
          <span className={classes.selectedItem} 
            onClick={() => styleSelectedHandler(props.option3)}>
              <img src={Option} alt="" className={classes.circle}/>
              {props.option3}
          </span>
        : 
        props.option3 == "Drawing" ?
        <span className={classes.item} 
          onClick={() => categorySelectedHandler(props.option3)}>
            <img className={classes.icon} src={Drawing} alt="" /> 
            {props.option3}
        </span> :
        <span className={classes.item} 
          onClick={() => styleSelectedHandler(props.option3)}>
            <img src={Option} alt="" className={classes.circle}/>
            {props.option3}
        </span>}


        {selected.includes(props.option4) ? 
          props.option4 == "Sculpture" ?
            <span className={classes.selectedItem} 
              onClick={() => categorySelectedHandler(props.option4)}>
                <img className={classes.icon} src={Painting} alt="" /> 
                {props.option4}
            </span> :
            <span className={classes.selectedItem} 
              onClick={() => styleSelectedHandler(props.option4)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option4}
            </span>
          : 
            props.option4 == "Sculpture" ?
            <span className={classes.item} 
              onClick={() => categorySelectedHandler(props.option4)}>
                <img className={classes.icon} src={Painting} alt="" /> 
                {props.option4}
            </span> :
            <span className={classes.item} 
              onClick={() => styleSelectedHandler(props.option4)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option4}
            </span>}
            

        {selected.includes(props.option5) ?
          props.option5 == "Mixed Media" ?
            <span className={classes.selectedItem} 
              onClick={() => categorySelectedHandler(props.option5)}>
                <img className={classes.icon} src={Painting} alt="" /> 
                {props.option5}
            </span> :
            <span className={classes.selectedItem} 
              onClick={() => styleSelectedHandler(props.option5)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option5}
            </span>
          : 
            props.option5 == "Mixed Media" ?
            <span className={classes.item} 
              onClick={() => categorySelectedHandler(props.option5)}>
                <img className={classes.icon} src={Painting} alt="" /> 
                {props.option5}
            </span> :
            <span className={classes.item} 
              onClick={() => styleSelectedHandler(props.option5)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option5}
            </span>}

        
        {selected.includes(props.option6) ?
          props.option6 == "Print" ?
            <span className={classes.selectedItem} 
              onClick={() => categorySelectedHandler(props.option6)}>
                <img className={classes.icon} src={Print} alt="" /> 
                {props.option6}
            </span> :
            <span className={classes.selectedItem} 
              onClick={() => styleSelectedHandler(props.option6)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option6}
            </span>
          : 
            props.option6 == "Print" ?
            <span className={classes.item} 
              onClick={() => categorySelectedHandler(props.option6)}>
                <img className={classes.icon} src={Print} alt="" /> 
                {props.option6}
            </span> :
            <span className={classes.item} 
              onClick={() => styleSelectedHandler(props.option6)}>
                <img src={Option} alt="" className={classes.circle}/>
                {props.option6}
            </span>}
        {}
    </div>
  );
}
export default OptionsList;
