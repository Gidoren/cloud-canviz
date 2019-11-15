import React, { Component } from "react";
import ArtForm from "../../components/ArtForm/ArtForm";
import Modal from "../../components/UI/Modal/Modal";
// import gql from "graphql-tag";
import { Query } from "react-apollo";
import Gallery from "../../components/Gallery/Gallery";
import { currentUser } from "../../grqphql/queries";
import Navbar from '../../components/Navbar/Navbar'
import classes from "./Crm.module.css";
import Spinner from '../../components/UI/Spinner/Spinner'
import { gql } from "apollo-boost";


class Crm extends Component {
  state = {
    show: false,
    isLoggedIn: false
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
  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
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
                <button className={classes.button} onClick={this.showModal}>
                  Upload Artwork
                </button>
                {data.currentUser && <Gallery {...data.currentUser} />}
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
