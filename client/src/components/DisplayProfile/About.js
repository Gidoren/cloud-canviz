import React from "react";
import classes from "./About.module.css";

const About = (props) =>(
    <div className={classes.all}>
        <header>
            <h1> {props.firstName} {props.lastName} </h1>
        </header>

        <article>
            <header>
                <h2>About</h2>
            </header>

            <p>About section</p>
        </article>
    </div>
)

export default About;