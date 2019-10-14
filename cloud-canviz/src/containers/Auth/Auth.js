import React, {Component} from 'react'

class Auth extends Component {
    render(){
        return(
            <div>
                LOGIN
                {/*Test buttons used to quickly move around pages*/}
                <br />
                <a href="/home/test">Click here to go to Home(Test only)</a>
                <br />
                <a href="/Profile/test">Click here to go to Profile (Test only)</a>
            </div>
        )
    }
}

export default Auth