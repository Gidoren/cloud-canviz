import React from "react";
import classes from "./CardColors.module.css";

const _getCardStyles = (hexColor, pixelPercent) => {
  const style = {
    background: hexColor,
    //   width: `${pixelPercent}%`
    width: "10%"
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
    <div className={classes.cardColors}>
      {props.colors.map((color, index) => {
        return (
          <div
            className={classes.colorBox}
            key={index}
            style={_getCardStyles(color.hexColor, color.pixelPercent)}
          ></div>
        );
      })}
    </div>
  );
};
export default CardColors;
