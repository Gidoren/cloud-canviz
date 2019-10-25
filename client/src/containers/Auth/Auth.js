import React, { Component } from "react";
import classes from "./Auth.module.css";
import Register from "../../components/Register/Register";

const Auth = () => {
  return (
    <div data-aos="zoom-in" className={classes.login}>
      <Register />
    </div>
  );
};

export default Auth;

//     <body className={classes.form}>
//         {/*Login element... still need to vertically align*/}
//         LOGIN
//         <hr />
//         {/*Test buttons used to quickly move around pages*/}
//         <br />
//         <div className={classes.butt}><button><a href="/home/test">Click here to go to Home(Test only)</a></button></div>
//         <br />
//         <div className={classes.butt}><button><a href="/Profile/test">Click here to go to Profile (Test only)</a></button></div>
//      </body>
