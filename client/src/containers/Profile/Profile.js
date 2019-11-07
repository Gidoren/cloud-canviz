import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Top from  "../../components/DisplayProfile/Top";
import Tab from "../../components/DisplayProfile/Tab";
import DisplayArt from '../../components/DisplayArt/DisplayArt';
import About from "../../components/DisplayProfile/About";
import Contact from "../../components/DisplayProfile/Contact";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const getUserQuery = gql`
  query getUserQuery($username: String) {
    getUser(username: $username) {
        firstName
        lastName
    }
  }
`;
class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {page: "artwork"}
    }
    render(){
        return(
            <div>
                <Query query={getUserQuery} variables={{username: window.location.href.replace("http://localhost:3000/profile/", '')}}>
                    {({loading, error, data}) => {
                        if(loading) return <p>loading..</p>
                        if(error) {console.log(error); console.log(data)}
                        return(
                            <div>
                                <Navbar />
                                <Top name={/*data.getUser.firstName*/ "NAME"}/>
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
                    }}
                
                </Query>
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