import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Top from  "../../components/DisplayProfile/Top";
import Tab from "../../components/DisplayProfile/Tab";
import DisplayArt from '../../components/DisplayArt/DisplayArt';
import About from "../../components/DisplayProfile/About";
import Contact from "../../components/DisplayProfile/Contact";

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
                <div className={classes.tab}>
                <div onClick={() => this.changePage("artwork")}>
                    <Tab option={"Artwork"}/>
                </div>
                <div onClick={() => this.changePage("about")}>
                    <Tab option={"About"}/>
                </div>
                <div onClick={() => this.changePage("contact")}>
                    <Tab option={"Contact"}/>
                </div>
                </div>
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
        else if (this.state.page === "about"){
            return <About />
        }
        else{
            return <Contact />
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