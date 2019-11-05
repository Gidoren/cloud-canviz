import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from "../../components/Navbar/Navbar";
import Top from  "../../components/DisplayProfile/Top";
import Tab from "../../components/DisplayProfile/Tab";
import DisplayArt from '../../components/DisplayArt/DisplayArt';

class Profile extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <Top name={"Thomas Schork"}/>
                <hr />
                <Tab option={"Artwork"}/>
                <Tab option={"About"}/>
                <Tab option={"Contact"}/>
                <hr />
                <DisplayArt />
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