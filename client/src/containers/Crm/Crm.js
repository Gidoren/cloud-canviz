import React, { Component } from "react";
import ArtForm from "../../components/ArtForm/ArtForm";
import Modal from "../../components/UI/Modal/Modal";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { AUTH_TOKEN } from "../../utils/constants";

import classes from "./Crm.module.css";

const currentUser = gql`
  query currentUser {
    currentUser {
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
    }
  }
`;

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
          {({ loading, error, data }) => {
            if (loading) return "loading ..";
            if (error) console.log("query error get user art :", error);
            console.log("Data from currentUser: ", data);
            return (
              <div>
                <button onClick={this.showModal}>Upload Artwork</button>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  <ArtForm />
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
