import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Top from "../../components/DisplayProfile/Top";
import Tab from "../../components/DisplayProfile/Tab";
import Contact from "../../components/DisplayProfile/Contact";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Gallery from "../../components/Gallery/Gallery";
import ProfileImage from '../../assets/images/noprofileimage.png'

/*Query data from the server to display on the profile*/
const getUserQuery = gql`
  query getUser($id: String) {
    getUser(id: $id) {
      _id
      email
      firstName
      lastName
      createdArtWorks {
        _id
        artist
        title
        year
        img {
          url
        }
        price
        styles
        tags
        description
        dimensions {
          height
          width
        }
        category
        medium
        primaryColor {
          hexColor
          pixelPercent
        }
        secondaryColor {
          hexColor
          pixelPercent
        }
        tertiaryColor {
          hexColor
          pixelPercent
        }
        colors {
          hexColor
          pixelPercent
        }
      }
      contactList {
        firstName
      }
    }
  }
`;

/*Contents of the profile component*/
class Profile extends Component {
  constructor(props) {
    super(props);
    /*Default state is set to display the artwork*/
    this.state = { page: "artwork" };
  }
  render() {
    return (
      <div>
        <Query
          query={getUserQuery}
          variables={{
            id: window.location.href.replace(
              "http://localhost:3000/profile/",
              ""
            )
          }}
        >
          {/*Decides what to display based on what server returns*/}
          {({ loading, error, data }) => {
            if (loading) return <p>loading..</p>;
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
                
                {data.getUser.createdArtWorks.length > 0 ? 
                  <Top name={data.getUser.firstName} imgURL={data.getUser.createdArtWorks[0].img.url}/> :
                  <Top name={data.getUser.firstName} imgURL={ProfileImage}/>
                }
                
                <hr />
                {/*Each tab is a clickable div that updates state*/}
                <div className={classes.tab}>
                  <div onClick={() => this.changePage("artwork")}>
                    <Tab option={"Artwork"} />
                  </div>
                  <div onClick={() => this.changePage("contact")}>
                    <Tab option={"Contact"} />
                  </div>
                </div>
                <hr />
                {data && this.displayPage({ ...data.getUser })}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
  changePage = newPage => {
    this.setState({ page: newPage });
  };
  /*Function to change between tabs on profile*/
  displayPage = user => {
    if (this.state.page === "artwork") {
      console.log("user from display page: ", user);
      /*return <Gallery {...user} />;*/
      return <Gallery {...user}/>
    } 
    else {
      return <Contact email={user.email}/>;
    }
  };
}
const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
