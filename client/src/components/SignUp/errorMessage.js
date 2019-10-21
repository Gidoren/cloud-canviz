import React from "react";

export default function ErrroMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p>This is required</p>;
      case "maxLength":
        return <p>Max Length is 25 chars</p>;
      case "pattern":
        return <p>Enter a valid email address</p>;
      case "min":
        return <p>Minmium age is 18</p>;
      case "validate":
        return <p>Passwords Do Not Match</p>;
      default:
        return null;
    }
  }

  return null;
}
