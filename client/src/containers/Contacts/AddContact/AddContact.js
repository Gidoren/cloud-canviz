import React, {Component} from 'react'
import classes from './AddContact.module.css'
import TextField from '@material-ui/core/TextField'

class AddContact extends Component {
    state = {
        contactFirstName: this.props.firstName,
        contactLastName: this.props.lastName,
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
        zip: this.props.zip
    }
    formChangeHandler = event => {
        this.setState({[event.target.name]: event.target.value})
    }
    render(){
        return (
            <div className={classes.addContact}>
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

                <table className={classes.table}>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="contactFirstName"
                            label="First Name" value={this.state.contactFirstName !== "Unnamed"? this.state.contactFirstName : ""}
                            onChange={this.formChangeHandler}/>
                        </th>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="contactLastName" 
                            label="Last Name" value={this.state.contactLastName !== "Contact"? this.state.contactLastName : ""}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="spouseFirstName" label="Spouse First Name"
                            value={this.state.spouseFirtName}
                            onChange={this.formChangeHandler}/>
                        </th>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="spouseLastName" label="Spouse Last Name"
                            value={this.state.spouseLastName}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="email" label="Email"
                            value={this.state.email}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                    
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="phoneHome" label="Phone(Home)"
                            value={this.state.phoneHome}
                            onChange={this.formChangeHandler}/>
                        </th>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="phoneMobile" label="Phone(Mobile)"
                            value={this.state.phoneMobile}
                            onChange={this.formChangeHandler}/>
                        </th>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="phoneOther" label="Phone(Other)"
                            value={this.state.phoneOther}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="company" label="Company"
                            value={this.state.company}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="birthday" label="Birthday"
                            value={this.state.birthday}
                            onChange={this.formChangeHandler}/>
                        </th>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="website" label="Website"
                            value={this.state.website}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <div className={classes.privateNote}>
                                <TextField className={classes.textField} margin="normal" variant="outlined" name="privateNote" label="Private Note"
                                d="outlined-multiline-flexible" multiline rowsMax="4"
                                value={this.state.privateNote}
                                onChange={this.formChangeHandler}/>
                            </div>
                        </th>
                    </tr>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="streetAddress" label="Street Address"
                            value={this.state.streetAddress}
                            onChange={this.formChangeHandler}/>
                        </th>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="city" label="City"
                             value={this.state.city !== "Unknown City"? this.state.city : ""}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                    <tr className={classes.tr}>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="state" label="State"
                            value={this.state.state}
                            onChange={this.formChangeHandler}/>
                        </th>
                        <th className={classes.th}>
                            <TextField className={classes.textField} margin="normal" variant="outlined" name="zip" label="Zip"
                            value={this.state.zip}
                            onChange={this.formChangeHandler}/>
                        </th>
                    </tr>
                </table>
            </div>

        )
    }
}

export default AddContact