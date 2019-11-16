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
      }
      contactList{
        firstName
      }
    }
  }
`;

class Profile extends Component {
  constructor(props) {
    super(props);
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
