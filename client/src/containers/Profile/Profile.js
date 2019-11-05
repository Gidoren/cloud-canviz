import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navbar from "../../components/Navbar/Navbar";
import Top from  "../../components/DisplayProfile/Top";
import Tab from "../../components/DisplayProfile/Tab";
import DisplayArt from '../../components/DisplayArt/DisplayArt';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {page: "artwork"}
    }
    render(){
        return(
            <div>
                <Navbar />
                <Top name={"Thomas Schork"}/>
                <hr />
                <Tab option={"Artwork"} onkeypress="changePage(artwork)"/>
                <Tab option={"About"} onkeypress="changePage(about)"/>
                <Tab option={"Contact"} onkeypress="changePage(contact)"/>
                <hr />
                {this.displayPage()}
            </div>
        )
    }
    changePage = (newPage) =>{
        this.setState({page: newPage});
    }
    displayPage = () =>{
        if (this.state.page === "artwork"){
            return <DisplayArt />
        }
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