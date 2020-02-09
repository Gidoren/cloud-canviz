import React, { Component } from "react";
import classes from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Top from "../../components/DisplayProfile/Top";
import Tab from "../../components/DisplayProfile/Tab";
import Contact from "../../components/DisplayProfile/Contact";
import { Query } from "react-apollo";
import Gallery from "../../components/Gallery/Gallery";
import ProfileImage from "../../assets/images/noprofileimage.png";
import Spinner from "../../components/UI/Spinner/Spinner";
import About from "../../components/About/About"
import { getUserQuery } from "../../grqphql/queries"

/*Contents of the profile component*/
class Profile extends Component {
 state = { 
    page: "Artwork" 
  };
  changePage = newPage => {
    this.setState({ page: newPage });
  };
  /*Function to change between tabs on profile*/
  displayPage = user => {
    if(this.state.page === "Artwork") {
      console.log("user from display page: ", user);
      /*return <Gallery {...user} />;*/
      return (
        <div className={classes.margins}>
          <Gallery {...user} />
        </div>
      );
    } 
    else if(this.state.page == "About") {
      return(
        <div className={classes.margins}>
          <About {...user}/>
        </div>
      )
    }
    else{
      return ""
    }
  };
  render() {
    return (
      <div>
        <Query
          query={getUserQuery}
          variables={{
            id: window.location.href.substr(window.location.href.length-24)
          }}
        >
          {/*Decides what to display based on what server returns*/}
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) {
              console.log(error);
              console.log(data);
            }
            if (data) {
              console.log("data from profile", data);
            }
            return (
              <div>
                <Navbar
                  link2={data ? "/profile/" + data.getUser._id : "/"}
                  link1={"/"}
                  active="Profile"
                  item1="Home"
                  item2="Profile"
                />

                {data.getUser.createdArtWorks.length > 0 ? (
                  <Top
                    name={data.getUser.firstName + " " + data.getUser.lastName}
                    imgURL={data.getUser.createdArtWorks[0].img.url}
                  />
                ) : (
                  <Top name={data.getUser.firstName + data.getUser.lastName} imgURL={ProfileImage} />
                )}

                <hr className={classes.hr}/>
                {/*Each tab is a clickable div that updates state*/}
                <div className={classes.tab}>
                  <div onClick={() => this.changePage("Artwork")}>
                    <Tab option={"Artwork"} active={this.state.page}/>
                  </div>
                  <div onClick={() => this.changePage("About")}>
                    <Tab option={"About"} active={this.state.page}/>
                  </div>
                  <div onClick={() => this.changePage("Followers")}>
                    <Tab option={"Followers"} active={this.state.page}/>
                  </div>

            
                  
                </div>
                {data && this.displayPage({ ...data.getUser })}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
  
}
export default Profile;
