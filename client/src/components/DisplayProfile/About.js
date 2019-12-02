import React, { Component } from "react";
import classes from "./About.module.css";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const getUserQuery = gql`
  query getUser($id: String) {
    getUser(id: $id) {
        AboutInput {
            description
            website
            profileImage
            phoneNumber
            address
        }
    }
  }
`;

class About extends Component{
    render(){
        return(
    
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
            if (data) {
              console.log("data from profile", data);
            }
            return(
                <div className={classes.all}>
                <header>
                    <h1> {this.props.firstName} {this.props.lastName} </h1>
                    {error ? <p/> : <p>{data.getUser.AboutInput.phoneNumber}</p>}
                    {error ? <p/> : <p>{data.getUser.AboutInput.website}</p>}
                    {error ? <p/> : <p>{data.getUser.AboutInput.address}</p>}
                </header>

                <article>
                    <header>
                        <h2>About</h2>
                    </header>
                   
                    
                    {error ? <p/> : <p>{data.getUser.AboutInput.decription}</p>}
                </article>
                </div>
            );
        }}
     </Query>
)}}

export default About;