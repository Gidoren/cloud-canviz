import React, { useState, useEffect, useReducer } from "react";
import classes from "./ImageReveal.module.css";

const initState = {};

const ImageReveal = props => {
  //   const styles = {
  //     svg: {
  //       background:
  //         "url('https://farm9.staticflickr.com/8760/17195790401_ceeeafcddb_o.jpg')",
  //       backgroundSize: "cover",
  //       width: "40vmin",
  //       height: "auto",
  //       display: "block",
  //       margin: "30vmin auto",
  //       "&:hover &:text": {
  //         transition: "font-size .4s ease-in",
  //         fontSize: "300px"
  //       }
  //     },
  //     text: {
  //       fontSize: "10px",
  //       transition: "font-size .4s ease-out",
  //       fontWeight: "900",
  //       fontFamily: "arial"
  //     }
  //   };

  const [state, setState] = useState(props);
  //   const [state, setState] = useReducer((state, newState) => {
  //     ({ ...state, ...newState });
  //   }, initState);

  const [lastLen, setLastLen] = useState(0);

  const getMeasureLetters = text => {
    const lowerText = props.text.toLowerCase();
    const textArr = lowerText.split("");
    const letterItems = [];
    for (const [i, v] of textArr.entries()) {
      letterItems.push(
        <text className={classes.measure} key={i} id={v}>
          {v.toUpperCase()}
        </text>
      );
    }
    console.log(state);
    return letterItems;
  };

  const getLengthPercent = letterIdx => {
    const numLetters = props.text.length;
    const percentLen = (100 / numLetters) * letterIdx;
    console.log("percentlen: ", percentLen);
    // setLastLen(lastLen + percentLen);
    return `${percentLen.toString()}%`;
  };

  useEffect(() => {
    let letterState = {};
    const letterItems = [];

    const getLetterStates = async () => {
      const numLetters = props.text.length;

      const lowerText = props.text.toLowerCase();
      const textArr = lowerText.split("");
      const fontSize = props.fontSize;
      let prevWidth = 0;
      let key = "";

      for (const [i, v] of textArr.entries()) {
        let el = document.getElementById(v.toLowerCase());
        el.style.fontSize = fontSize;
        const height = el.clientHeight;
        // const width = el.clientWidth + 1;
        const width = el.getComputedTextLength() * 0.6;

        letterItems.push(
          <text
            className={classes.text}
            key={i}
            id={`ltr-${v}`}
            //   x={getLengthPercent(i)}
            x={prevWidth}
            textAnchor="left"
            y="100%"
            dy="0"
          >
            {v.toUpperCase()}
          </text>
        );

        key = `${v}-${i}`;

        letterState[key] = {
          startX: prevWidth,
          width: width,
          height: height,
          letter: v,
          index: i
        };
        prevWidth = prevWidth + width;
      }

      await setState({
        ...letterState,
        letters: [...letterItems],
        ...props,
        numLetters: numLetters
      });
    };

    getLetterStates();
  }, [props]);

  return (
    <div>
      <svg>{getMeasureLetters("painting")}</svg>

      {/* <svg
        className={classes.svg}
        viewbox={`0 0 ${props.width} ${props.height}`}
        width={props.width}
        height={props.height}
      > */}
      <svg
        className={classes.svg}
        style={{
          width: `${props.widthPercent}vmin`,
          margin: `${props.marginPercent}vmin auto`
        }}
        viewBox="0 0 50 50"
        width="50"
        height="50"
      >
        <defs>
          <mask id="mask" x="0" y="0" width="100" height="49">
            <rect
              //   style={{ height: "100%", width: "100%" }}
              x="0.5"
              y="0.5"
              width="49"
              height="49"
              fill="#fff"
            />

            {/* {state.letters && state.letters} */}
            <text
              className={classes.text}
              x="50%"
              textAnchor="middle"
              y="100%"
              dy="0"
            >
              {props.text.toUpperCase()}
            </text>
          </mask>
        </defs>
        <rect
          x="0.5"
          y="0.5"
          //   style={{ height: "100%", width: "100%" }}
          height="49"
          width="49"
          mask="url(#mask)"
          fillOpacity={props.overlayOpacity}
          fill={props.overlayColor}
        />
      </svg>
    </div>
  );
};

export default ImageReveal;
