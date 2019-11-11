import React, {Component} from 'react'
import classes from './Contact.module.css'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ContactForm from './ContactForm/ContactForm'
import * as Query from '../../../grqphql/mutations'
import { Mutation } from 'react-apollo';

class Contact extends Component {
    state = {
        contactFirstName: this.props.firstName,
        contactLastName: this.props.lastName,
        spouseFirstName: this.props.spouseFirstName,
        spouseLastName: this.props.spouseLastName,
        totalSales: this.props.totalSales,
        email: this.props.email,
        phoneHome: this.props.phoneHome,
        phoneMobile: this.props.phoneMobile,
        phoneOther: this.props.phoneOther,
        website: this.props.website,
        birthday: this.props.birthday,
        company: this.props.company,
        privateNote: this.props.privateNote,
        streetAddress: this.props.streetAddress,
        city: this.props.city,
        state: this.props.state,
        zip: this.props.zip,
        value: 1,
        showSaveChanges: false
    }
    formChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
        this.setState({showSaveChanges: true})
    }
    tabChangeHandler = (event, newValue) => {
        this.setState({value: newValue})
    }
    saveChangesHandler = (event, createContact) => {
        createContact({
            variable: {
                contactInput: {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    phone_number: this.state.phoneHome,
                    email: this.state.email
                }
            }
        })
    }
    render(){
        return (
            <Mutation mutation={Query.CREATE_CONTACT}>
                {(createContact, {data}) => (
                    <div data-aos="slide-up" className={classes.addContact}>
                        <button className={classes.goBack} onClick={this.props.addContactForumHandler}>&#8249;</button>
                        <div className={classes.profileInfo}>
                            <div>
                                <h3 className={classes.name}>{this.state.contactFirstName} {this.state.contactLastName}</h3>
                                <p className={classes.city}>{this.state.city}</p>  
                            </div>
                            <div>
                                <p>TOTAL SALES</p>
                                <h2 className={classes.totalSales}>${this.state.totalSales}</h2>
                            </div>
                        </div>
                        <Paper className={classes.paper}>
                            <Tabs
                                value={this.state.value}
                                onChange={this.tabChangeHandler}
                                indicatorColor="primary"
                                textColor="primary"
                                centered>
                                <Tab label="Potential Purchase" />
                                <Tab label="Contact Info" />
                            </Tabs>
                        </Paper>
                        {this.state.value === 1 && <ContactForm {...this.state} formChangeHandler={this.formChangeHandler}/>}
                        {this.state.showSaveChanges && 
                        <button 
                            className={classes.saveChangesButton} 
                            data-aos="slide-down"
                            onClick={event => { 
                                event.preventDefault();
                                {console.log(this.state)}
                                createContact({
                                variables: {
                                    contactInput: {
                                        firstName: this.state.contactFirstName,
                                        lastName: this.state.contactLastName,
                                        phone_number: this.state.phoneHome,
                                        email: this.state.email
                                    }
                                }
                                })
                                .then(res => {
                                    console.log(res)
                                })}}>
                            SAVE CHANGES
                        </button>}
                    </div>
                )}
            </Mutation>
            
        )
    }
}

export default Contact