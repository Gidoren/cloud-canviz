import React, { Component } from "react";
import ArtForm from "../../components/ArtForm/ArtForm";
import Modal from "../../components/UI/Modal/Modal";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import Gallery from "../../components/Gallery/Gallery";
import { currentUser } from "../../grqphql/queries";

import classes from "./Crm.module.css";

class Crm extends Component {
  state = {
    show: false,
    originalBodyOverflow: document.body.style.overflow
  };

  showModal = () => {
    this.setState({ show: true });
    document.body.style.overflow = "hidden";
  };

  hideModal = () => {
    this.setState({ show: false });
    document.body.style.overflow = this.state.originalBodyOverflow;
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

                <Gallery {...data.currentUser} />
                <Modal
                  show={this.state.show}
                  handleClose={this.hideModal}
                  showCloseButton={false}
                >
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
