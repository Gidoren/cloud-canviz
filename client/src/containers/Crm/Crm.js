import React, { Component } from "react";
import ArtForm from "../../components/ArtForm/ArtForm";
import Modal from "../../components/UI/Modal/Modal";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Gallery from "../../components/Gallery/Gallery";
import { currentUser } from "../../grqphql/queries";

import { AUTH_TOKEN } from "../../utils/constants";

import classes from "./Crm.module.css";




class Crm extends Component {
  state = {
    show: false
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <Query query={currentUser}>
          {({ loading, error, data, refetch }) => {
            if (loading) return "loading ..";
            if (error) console.log("query error get user art :", error);
            console.log("Data from currentUser: ", data);
            return (
              <div className={classes.container}>
                <button className={classes.button} onClick={this.showModal}>
                  Upload Artwork
                </button>
                {/* {data.currentUser.createdArtWorks.map(art => (
                  <img
                    key={art._id}
                    style={{ width: "300px" }}
                    src={art.img.url}
                  ></img>
                ))} */}
                <Gallery {...data.currentUser} />
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  <ArtForm
                    handleHideModal={this.hideModal}
                    handleRefetch={refetch}
                  />
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
