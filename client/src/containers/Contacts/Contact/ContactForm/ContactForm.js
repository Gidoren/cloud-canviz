import React from 'react'
import classes from './ContactForm.module.css'
import TextField from '@material-ui/core/TextField'

const ContactForm = (props) => (
    <table data-aos="slide-up" className={classes.table}>
        <tbody>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="contactFirstName"
                    label="First Name" value={props.contactFirstName !== "Unnamed"? props.contactFirstName : ""}
                    onChange={props.formChangeHandler}
                    />
                </th>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="contactLastName" 
                    label="Last Name" value={props.contactLastName !== "Contact"? props.contactLastName : ""}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="spouseFirstName" label="Spouse First Name"
                    value={props.spouseFirtName}
                    onChange={props.formChangeHandler}/>
                </th>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="spouseLastName" label="Spouse Last Name"
                    value={props.spouseLastName}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="email" label="Email"
                    value={props.email}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
            
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="phoneHome" label="Phone(Home)"
                    value={props.phoneHome}
                    onChange={props.formChangeHandler}/>
                </th>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="phoneMobile" label="Phone(Mobile)"
                    value={props.phoneMobile}
                    onChange={props.formChangeHandler}/>
                </th>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="phoneOther" label="Phone(Other)"
                    value={props.phoneOther}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="company" label="Company"
                    value={props.company}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="birthday" label="Birthday"
                    value={props.birthday}
                    onChange={props.formChangeHandler}/>
                </th>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="website" label="Website"
                    value={props.website}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <div className={classes.privateNote}>
                        <TextField className={classes.textField} margin="normal" variant="outlined" name="privateNote" label="Private Note"
                        d="outlined-multiline-flexible" multiline rowsMax="4"
                        value={props.privateNote}
                        onChange={props.formChangeHandler}/>
                    </div>
                </th>
            </tr>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="streetAddress" label="Street Address"
                    value={props.streetAddress}
                    onChange={props.formChangeHandler}/>
                </th>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="city" label="City"
                    value={props.city !== "Unknown City"? props.city : ""}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
            <tr className={classes.tr}>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="state" label="State"
                    value={props.state}
                    onChange={props.formChangeHandler}/>
                </th>
                <th className={classes.th}>
                    <TextField className={classes.textField} margin="normal" variant="outlined" name="zip" label="Zip"
                    value={props.zip}
                    onChange={props.formChangeHandler}/>
                </th>
            </tr>
        </tbody>
    </table>
)

export default ContactForm