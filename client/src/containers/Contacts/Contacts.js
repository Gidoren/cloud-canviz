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

const columns = [
  { id: 'contact', label: 'Contact', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 100 },
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
function createData(contact, phone, email, leadStatus) {
  const l = 1000;
  return { contact, phone, email, leadStatus, l};
}
const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];
class Contacts extends Component {
  state = {
    showAddContactForum: false,
    page: 0,
    rowsPerPage: 10
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

  render() {
    let pageToShow = (
      <div data-aos="zoom-in">
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
                {rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={rows.indexOf(row)}>
                      {columns.map(column => {
                        const value = row[column.id];
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
            count={rows.length}
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
        {pageToShow}
      </div>
    );
  }
}
export default Contacts;
