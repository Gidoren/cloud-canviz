import React from "react"
import classes from "./About.module.css";
import Attachment from "../../assets/images/attachment.png"
import Facebook from "../../assets/images/facebook.png"
import Twitter from "../../assets/images/twitter.png"
import Instagram from "../../assets/images/instagram.png"
const About = props => {
    return (
        <div>
            {/** <div className={classes.head}>About {props.firstName} {props.lastName}</div> */}
            <div className={classes.about}>
                <div className={classes.left}>
                    <div className={classes.links}>
                        <h3 className={classes.h3}>Links</h3>
                        <span className={classes.link}>
                            <img src={Attachment} className={classes.img} />
                            <a href={props.website} target="_black">Visit my website</a>
                        </span>
                        <span className={classes.link}>
                            <img src={Facebook} className={classes.img} />
                            <a href={props.website} target="_black">Like me on Facebook</a>
                        </span>
                        <span className={classes.link}>
                            <img src={Twitter} className={classes.img} />
                            <a href={props.website} target="_black">Follow me on Twitter</a>
                        </span>
                        <span className={classes.link}>
                            <img src={Instagram} className={classes.img} />
                            <a href={props.website} target="_black">Follow me on Instagram</a>
                        </span>
                        
                    </div>
                    <div className={classes.contacts}>
                        <h3>Contacts</h3>
                        <p className={classes.contact}>EMAIL: {props.email}</p>
                        <p className={classes.contact}>PHONE: {props.phoneNumber}</p>
                    </div>
                </div>
                    
                <div className={classes.bio}>
                    <h3 className={classes.h3}>Biography</h3>
                    <p className={classes.description}>{props.description}</p>
                </div>
            </div>
        </div>
        
    )
}

export default About