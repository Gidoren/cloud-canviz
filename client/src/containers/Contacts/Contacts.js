import React, { Component } from "react";
import classes from "./Contacts.module.css";
import Contact from "./Contact/Contact";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Navbar from "../../components/Navbar/Navbar";
import { currentUser } from "../../grqphql/queries";
import { DELETE_CONTACT } from "../../grqphql/mutations";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Query } from "react-apollo";
import deleteIcon from "../../assets/images/delete.png";

const columns = [
  { id: "delete", label: "", width: 50 },
  { id: "fullName", label: "Contact", minWidth: 170 },
  { id: "phone_number", label: "Phone", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right"
  },
  {
    id: "birthday",
    label: "Birthday",
    minWidth: 170,
    align: "right"
  },
  {
    id: "street_address",
    label: "Street Address",
    minWidth: 170,
    align: "right"
  },
  {
    id: "city",
    label: "City",
    minWidth: 170,
    align: "right"
  },
  {
    id: "state",
    label: "State",
    minWidth: 170,
    align: "right"
  },
  {
    id: "zip",
    label: "Zip Code",
    minWidth: 170,
    align: "right"
  },
  {
    id: "company",
    label: "Company",
    minWidth: 170,
    align: "right"
  },
  {
    id: "website",
    label: "Website",
    minWidth: 170,
    align: "right"
  },
  {
    id: "mobile_phone",
    label: "Phone(Mobile)",
    minWidth: 170,
    align: "right"
  },
  {
    id: "other_phone",
    label: "Phone(Other)",
    minWidth: 170,
    align: "right"
  }
  /** {
    id: 'leadStatus',
    label: 'Lead Status',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'leadValue',
    label: 'Lead Value',
    minWidth: 170,
    align: 'right'
  }, */
];

class Contacts extends Component {
  state = {
    showContactForm: false,
    page: 0,
    rowsPerPage: 10,
    rows: [],
    contactListLoaded: false,
    showContactDeletedMsg: false,
    updateContactPage: ""
  };
  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: +event.target.value });
    this.setState({ page: 0 });
  };
  showContactFormHandler = () => {
    this.setState(prevState => ({
      showContactForm: !prevState.showContactForm
    }));
    if (this.state.showContactForm === true)
      this.setState({ updateContactPage: "" });
  };
  deleteContactHandler = contact => {
    const id = contact["_id"];
    const { data } = this.props.client.mutate({
      mutation: DELETE_CONTACT,
      variables: { contactID: id }
    });
    this.setState({
      rows: this.state.rows.filter(function(value) {
        return value["_id"] !== id;
      })
    });
    this.setState({ showContactDeletedMsg: true });

    setTimeout(
      function() {
        this.setState({ showContactDeletedMsg: false });
      }.bind(this),
      8000
    );
  };
  saveNewContactHandler = contact => {
    console.log(this.state.rows);
    this.setState({
      rows: this.state.rows.filter(i => i.email !== contact.email)
    });
    this.setState({ rows: this.state.rows.concat(contact) });
  };
  showUpdateContactPageHandler = contact => {
    this.setState(prevState => ({
      showContactForm: !prevState.showContactForm
    }));
    this.setState({
      updateContactPage: (
        <Contact
          {...contact}
          showContactForm={this.showContactFormHandler}
          saveNewContact={this.saveNewContactHandler}
          client={this.props.client}
        />
      )
    });
  };
  render() {
    console.log(this.state.rows);
    let pageToShow = this.state.contactListLoaded && (
      <div data-aos="fade-up">
        <div className={classes.cover}>
          <p className={classes.coverHeading}>Contacts</p>
          <button
            className={classes.button}
            onClick={this.showContactFormHandler}
          >
            ADD CONTACT
          </button>
        </div>
        <Paper className={classes.root}>
          <div className={classes.tableWrapper}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, width: column.width }}
                    >
                      <p>{column.label}</p>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows
                  .slice(
                    this.state.page * this.state.rowsPerPage,
                    this.state.page * this.state.rowsPerPage +
                      this.state.rowsPerPage
                  )
                  .map(row => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={this.state.rows.indexOf(row)}
                      >
                        {columns.map(column => {
                          const value = row[column.id];
                          if (column.id === "delete") {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                <button
                                  className={classes.deleteButton}
                                  onClick={() => this.deleteContactHandler(row)}
                                >
                                  <img
                                    id="img1"
                                    className={classes.deleteIcon}
                                    src={deleteIcon}
                                    alt="delete"
                                  />
                                </button>
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell
                                className={classes.tableCell}
                                key={column.id}
                                align={column.align}
                                onClick={() =>
                                  this.showUpdateContactPageHandler(row)
                                }
                              >
                                <p>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </p>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={this.state.rows.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            backIconButtonProps={{
              "aria-label": "previous page"
            }}
            nextIconButtonProps={{
              "aria-label": "next page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );

    if (this.state.showContactForm === true) {
      pageToShow = (
        <Contact
          firstName="Unnamed"
          lastName="Contact"
          city="Unknown City"
          totalSales="0.00"
          email="Unknown@email.com"
          phone_number="Unknown Phone"
          showContactForm={this.showContactFormHandler}
          saveNewContact={this.saveNewContactHandler}
          client={this.props.client}
        />
      );
    }
    return (
      <div>
        <Query
          query={currentUser}
          variables={{
            id: window.location.href.replace(
              "http://localhost:3000/crm/contacts/",
              ""
            )
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Spinner />;
            if (error) {
              console.log(error);
            }
            if (data) {
              if (
                (this.state.rows.length === 0 &&
                  this.state.contactListLoaded === false) ||
                this.state.contactListLoaded === false
              ) {
                console.log(data.currentUser.contactList);
                this.setState({ rows: data.currentUser.contactList });
                this.setState({ contactListLoaded: true });
              }
            }
            return (
              <div>
                <Navbar
                  link1={data ? "/crm/dashboard/" + data.currentUser._id : "/"}
                  link2={data ? "/crm/" + data.currentUser._id : "/"}
                  link3={data ? "/crm/contacts/" + data.currentUser._id : "/"}
                  link4="/"
                  active="Contacts"
                  item2="Inventory"
                  item3="Contacts"
                  item4="Home"
                  page="Crm"
                  isLoggedIn={true}
                  isArtist={true}
                  handleIsLoggedin={this.handleIsLoggedin}
                />
                {this.state.updateContactPage === ""
                  ? pageToShow
                  : this.state.updateContactPage}
                {this.state.showContactDeletedMsg && (
                  <button className={classes.contactDeletedMsg}>
                    Contact Deleted!
                  </button>
                )}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
export default Contacts;
