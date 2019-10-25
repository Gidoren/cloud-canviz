import React from "react";

export default function ErrroMessage({ error }) {
  const style = {
    color: "#dd6a58",
    display: "inline-block",
    marginBlockStart: "0em"
  };

  if (error) {
    switch (error.type) {
      case "required":
        return <p style={style}>⚠ This is required</p>;
      case "maxLength":
        return <p style={style}>⚠ Max Length is 25 chars</p>;
      case "pattern":
        return <p style={style}>⚠ Enter a valid email address</p>;
      case "min":
        return <p style={style}>⚠ Minmium age is 18</p>;
      case "validate":
        return <p style={style}>⚠ Passwords Do Not Match</p>;
      default:
        return null;
    }
  }

  return null;
}
