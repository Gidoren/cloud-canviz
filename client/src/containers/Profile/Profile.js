import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navbar from "../../components/Navbar/Navbar";
import Top from  '../../components/DisplayProfile/Top';

class Profile extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <Top name={"Thomas Schork"}/>
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