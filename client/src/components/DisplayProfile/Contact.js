import React from "react";
import classes from "./Contact.module.css";

const Contact = (props) =>(
    <div className={classes.all}>
        <form action="mailto:example@example.com" method="post" enctype="text/plain">
            <p>Name:</p><br />
            <input type="text" name="name" /><br />

            <p>Email:</p><br />
            <input type="text" name="mail" /><br />

            <p>Message:</p><br />
            <input type="text" name="comment" size="50" /><br />

            <input type="submit" value="Send" />
            <input type="reset" value="Reset" />
        </form>
    </div>
)

export default Contact;