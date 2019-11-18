import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Top from "../../components/DisplayProfile/Top";
import Tab from "../../components/DisplayProfile/Tab";
import About from "../../components/DisplayProfile/About";
import Contact from "../../components/DisplayProfile/Contact";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import Gallery from "../../components/Gallery/Gallery";

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
                <Navbar />
                <Top name={data.getUser.firstName} />
                <hr />
                {/*Each tab is a clickable div that updates state*/}
                <div className={classes.tab}>
                  <div onClick={() => this.changePage("artwork")}>
                    <Tab option={"Artwork"} />
                  </div>
                  <div onClick={() => this.changePage("about")}>
                    <Tab option={"About"} />
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
      return <Gallery {...user} />;
    } else if (this.state.page === "about") {
      return <About />;
    } else {
      return <Contact />;
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
