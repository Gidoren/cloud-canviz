import React, { Component } from "react";
import classes from "./Contacts.module.css";
import AddContact from "./AddContact/AddContact";

class Contacts extends Component {
  state = {
    showAddContactForum: false
  };
  addContactForumHandler = () => {
    this.setState({ showAddContactForum: true });
  };

  render() {
    let pageToShow = (
      <div>
        <button
          className={classes.button}
          onClick={this.addContactForumHandler}
        >
          ADD CONTACT
        </button>
        <table className={classes.table}>
          <tr className={classes.tr}>
            <th className={classes.th}>Contact</th>
            <th className={classes.th}>Phone</th>
            <th className={classes.th}>Email</th>
            <th className={classes.th}> Lead Status</th>
            <th className={classes.th}>Lead Value</th>
          </tr>
          <tr className={classes.tr}>
            <th className={classes.th}>Yusuf Dost</th>
            <th className={classes.th}>4154809031</th>
            <th className={classes.th}>Yusuf@gmail.com</th>
            <th className={classes.th}>Hot</th>
            <th className={classes.th}>$10000</th>
          </tr>
          <tr className={classes.tr}>
            <th className={classes.th}>Yusuf Dost</th>
            <th className={classes.th}>4154809031</th>
            <th className={classes.th}>Yusuf@gmail.com</th>
            <th className={classes.th}>Hot</th>
            <th className={classes.th}>$10000</th>
          </tr>
        </table>
      </div>
    );

    if (this.state.showAddContactForum === true) {
      pageToShow = <AddContact 
                      firstName="Unnamed"
                      lastName="Contact"
                      city="Unknown City"
                      totalSales="0.00"/>
    }
    return (
      <div> 
        {pageToShow}
      </div>
    );
  }
}
export default Contacts;
