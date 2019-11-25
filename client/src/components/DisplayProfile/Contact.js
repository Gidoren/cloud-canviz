import React from "react";
import classes from "./Contact.module.css";

const Contact = (props) =>(
    <div className={classes.all}>
        {/*Creating a form used to email artist, email to send to is in props*/}
        <form action={"mailto:"+props.email} method="post" enctype="text/plain">
            <p>Name:</p>
            <input type="text" name="name" placeholder="Your Name" /><br />
            <br />

            <p>Email:</p>
            <input type="text" name="mail" placeholder="Your email" /><br />
            <br />

            <p>Message:</p>
            <textarea className={classes.textBox} name="subject" placeholder="Enter Text Here" /><br />
            <br />

            <input type="submit" value="Send" />
            <input type="reset" value="Reset" />
        </form>
    </div>
)

export default Contact;