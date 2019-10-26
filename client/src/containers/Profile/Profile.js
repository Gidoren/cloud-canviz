import React, {Component} from 'react';
import {connect} from 'react-redux';
import Navbar from "../../components/Navbar/Navbar";
import Top from  "../../components/DisplayProfile/Top";
import Tabbar from "../../components/DisplayProfile/Tabbar";

class Profile extends Component {
    render(){
        return(
            <div>
                <Navbar />
                <Top name={"Thomas Schork"}/>
                <Tabbar />
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