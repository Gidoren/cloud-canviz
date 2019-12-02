import React, { Component } from "react";
import ArtForm from "../../components/ArtForm/ArtForm";
import Modal from "../../components/UI/Modal/Modal";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import Gallery from "../../components/Gallery/Gallery";
import { currentUser } from "../../grqphql/queries";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Crm.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import { gql } from "apollo-boost";
import { Paper, Grid, Typography } from "@material-ui/core";

import ArtFormDrawer from "../../components/ArtForm/ArtFormDrawer";

const initialState = {
  _id: null,
  title: "Untitled",
  artist: "Unknown Artist",
  medium: "",
  dimensions: { height: "", width: "" },
  price: "",
  category: "",
  tags: [],
  styles: [],
  year: "2019",
  description: "",
  img: {
    url: ""
  }
};

class Crm extends Component {
  state = {
    show: false,
    isLoggedIn: false,
    originalBodyOverflow: document.body.style.overflow,
    artProps: { ...initialState }
  };
  async componentDidMount() {
    const { data } = await this.props.client.query({
      query: gql`
        {
          isLoggedIn @client
        }
      `
    });

    this.setState({ isLoggedIn: data.isLoggedIn });
    console.log("isLoggedIn data: ", data);
    console.log("isLoggedIn state: ", this.state.isLoggedIn);
  }

  handleSetArtProps = propsFromArt => {
    console.log("artProps: ", { ...propsFromArt });
    this.setState({ artProps: { ...propsFromArt } }, () => {
      this.showModal();
    });
  };
  showModal = () => {
    this.setState({ show: true });
    document.body.style.overflow = "hidden";
  };

  hideModal = () => {
    this.setState({ show: false });
    document.body.style.overflow = this.state.originalBodyOverflow;
  };
  handleIsLoggedin = value => {
    this.setState({ isLoggedIn: value });
  };
  render() {
    return (
      <div>
        <Query query={currentUser}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <Spinner />;
            if (error) console.log("query error get user art :", error);
            console.log("Data from currentUser: ", data);
            return (
              <div className={classes.container}>
                <Navbar
                  link1={data ? "/crm/dashboard/" + data.currentUser._id : "/"}
                  link2={data ? "/crm/inventory/" + data.currentUser._id : "/"}
                  link3={data ? "/crm/contacts/" + data.currentUser._id : "/"}
                  link4="/"
                  active="Inventory"
                  item1="Dashboard"
                  item2="Inventory"
                  item3="Contacts"
                  item4="Home"
                  page="Crm"
                  isLoggedIn={this.state.isLoggedIn}
                  handleIsLoggedin={this.handleIsLoggedin}
                />
                <div style={{ padding: 30 }}>
                  <Grid container alignContent="center" alignItems="center">
                    <Grid
                      item
                      xs={12}
                      justify="center"
                      alignContent="center"
                      alignItems="center"
                    >
                      <Typography variant="h5">INVENTORY</Typography>
                    </Grid>
                    <Grid item xs={12} justify="flex-end">
                      <button
                        className={classes.button}
                        onClick={this.showModal}
                      >
                        Upload Artwork
                      </button>
                    </Grid>
                  </Grid>
                </div>
                <Gallery
                  {...data.currentUser}
                  handleSetArtProps={this.handleSetArtProps}
                  showModal={this.showModal}
                />
                <Modal
                  show={this.state.show}
                  handleClose={this.hideModal}
                  showCloseButton={false}
                >
                  <ArtFormDrawer>
                    <div className={classes.artForm}>
                      <ArtForm
                        handleHideModal={this.hideModal}
                        handleRefetch={refetch}
                        artProps={this.state.artProps}
                      />
                    </div>
                  </ArtFormDrawer>
                </Modal>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Crm;
