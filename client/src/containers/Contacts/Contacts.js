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
import {DELETE_CONTACT} from '../../grqphql/mutations'
import Spinner from "../../components/UI/Spinner/Spinner";
import { Query } from "react-apollo";
import deleteIcon from '../../assets/images/delete.png'
const columns = [
  { id: 'delete', label: '', width: 50},
  { id: 'fullName', label: 'Contact' , minWidth: 170},
  { id: 'phone_number', label: 'Phone', minWidth: 100 },
  {
    id: 'email',
    label: 'Email',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'city',
    label: 'City',
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
    showContactForm: false,
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
  showContactFormHandler = () => {
    this.setState(prevState => ({showContactForm: !prevState.showContactForm }));
  };
  deleteContactHandler = (contact) => {
    return(
      <Query query={DELETE_CONTACT} variables={contact['_id']}>
        {({data, loading, error}) => {
          if(loading) return <Spinner />
          if(error) return error
          if(data) console.log("contact deleted")
        }}
      </Query>
    )
  }
  render() {
    let pageToShow = (
      this.state.rows && <div data-aos="zoom-in">
        <div className={classes.cover}>
          <p className={classes.coverHeading}>Contacts</p>
          <button
            className={classes.button}
            onClick={this.showContactFormHandler}>
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
                        if(column.id === "delete"){
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <button className={classes.deleteButton} onClick={() => this.deleteContactHandler(row)}><img id="img1" className={classes.deleteIcon} src={deleteIcon} alt="delete" onClick={console.log("HI")}/></button>
                            </TableCell>
                          )
                        }
                        else{
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
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

    if (this.state.showContactForm === true) {
      pageToShow = <Contact 
                      firstName="Unnamed"
                      lastName="Contact"
                      city="Unknown City"
                      totalSales="0.00"
                      showContactForm={this.showContactFormHandler}/>
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
