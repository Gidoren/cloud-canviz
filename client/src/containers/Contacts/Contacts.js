import React, { Component } from "react";
import classes from "./Contacts.module.css";
import Contact from "./Contact/Contact";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Navbar from '../../components/Navbar/Navbar'
import {currentUser} from '../../grqphql/queries'
import Spinner from "../../components/UI/Spinner/Spinner";
import { Query } from "react-apollo";

const columns = [
  { id: 'fullName', label: 'Contact', minWidth: 170 },
  { id: 'phone_number', label: 'Phone', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
  },
  {
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
  },
];

class Contacts extends Component {
  state = {
    showAddContactForum: false,
    page: 0,
    rowsPerPage: 10, 
    rows: []
  };
  handleChangePage = (event, newPage) => {
    this.setState({page: newPage})
  }
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: +event.target.value})
    this.setState({page: 0})
  }
  addContactForumHandler = () => {
    this.setState(prevState => ({showAddContactForum: !prevState.showAddContactForum }));
  };
  addContactListHandler = (contactList) => {
    console.log(contactList, "Contactlist")
    this.setState({rows: contactList})
  }
  render() {
    let pageToShow = (
      this.state.rows && <div data-aos="zoom-in">
        <div className={classes.cover}>
          <p className={classes.coverHeading}>Contacts</p>
          <button
            className={classes.button}
            onClick={this.addContactForumHandler}>
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
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                  console.log(row)
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={this.state.rows.indexOf(row)}>
                      {columns.map(column => {
                        const value = row[column.id];
                        console.log(value)
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
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
              'aria-label': 'previous page',
            }}
            nextIconButtonProps={{
              'aria-label': 'next page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    ); 

    if (this.state.showAddContactForum === true) {
      pageToShow = <Contact 
                      firstName="Unnamed"
                      lastName="Contact"
                      city="Unknown City"
                      totalSales="0.00"
                      addContactForumHandler={this.addContactForumHandler}/>
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
              console.log(data);
            }
            if (data) {
              console.log("data from profile", data.currentUser.contactList[0]['firstName']);
              if(this.state.rows.length == 0){
                this.setState({rows: data.currentUser.contactList})
                console.log(this.state.rows)
              }
              
            }
            return (
              <div>
                {console.log(data)}
                <Navbar
                  link1={data ? "/crm/dashboard/" + data.currentUser._id : "/"}
                  link2={data ? "/crm/" + data.currentUser._id : "/"}
                  link3={data ? "/crm/contacts/" + data.currentUser._id : "/"}
                  link4="/"
                  active="Contacts"
                  item1="Dashboard"
                  item2="Inventory"
                  item3="Contacts"
                  item4="Home"
                  page="Crm"
                  isLoggedIn={true}
                  handleIsLoggedin={this.handleIsLoggedin}
                />
                {pageToShow}
              </div>
            );
          }}
        </Query> 
      </div>
    );
  }
}
export default Contacts;
