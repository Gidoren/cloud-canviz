import React, {Component} from 'react';
import {connect} from 'react-redux'

class Profile extends Component {
    render(){
        return(
            <div>
                Profile
            </div>
        )
    }
}
const mapStateToProps = state =>{ 
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)