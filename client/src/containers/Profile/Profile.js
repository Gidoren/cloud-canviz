import React, {Component} from 'react';
import {connect} from 'react-redux';
import Top from  '../../components/DisplayProfile/Top';

class Profile extends Component {
    render(){
        return(
            <div>
                <Top name={"Thomas"}/>
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