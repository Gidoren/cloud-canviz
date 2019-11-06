import React from "react";
import classes from "./Tab.module.css";

const About = (props) =>(
    <div className={classes.all}>
        <header>
            <h1>Name</h1>
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