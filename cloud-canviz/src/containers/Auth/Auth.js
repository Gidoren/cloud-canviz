import React, {Component} from 'react'
import classes from './Auth.module.css'

class Auth extends Component {
    render(){
        return(
            <div className={classes.login}>
                {/*Login element... still need to vertically align*/}
                LOGIN
                {/*Test buttons used to quickly move around pages*/}
                <br />
                <button><a href="/home/test">Click here to go to Home(Test only)</a></button>
                <br />
                <button><a href="/Profile/test">Click here to go to Profile (Test only)</a></button>
            </div>
        )
    }
}

export default Auth