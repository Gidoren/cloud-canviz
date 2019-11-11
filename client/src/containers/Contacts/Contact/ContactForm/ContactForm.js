import React from 'react'
import classes from './ContactForm.module.css'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles';

const StyledTextField = withStyles(theme => ({
    root: {
        '& label.Mui-focused': {
            color: '2A4B7C',
           },
           '& .MuiInput-underline:after': {
            borderBottomColor: '2A4B7C',
           },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: '1px solid #F8F8F8',
              boxShadow: '0 1px 1px darkgrey'
            },
            '&:hover fieldset': {
              borderColor: '2A4B7C',
            },
            '&.Mui-focused fieldset': {
              borderColor: '2A4B7C',
            },
          }
    },
    label: {
        color: theme.palette.secondary
    }
}))(TextField);

const ContactForm = (props) => { 
    return (
        <table data-aos="slide-up" className={classes.table}>
            <tbody>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField inputProps={{ style: { fontFamily: 'nunito', color: 'grey'}}} className={classes.textField} margin="normal" variant="outlined" name="contactFirstName"
                        label="First Name" value={props.contactFirstName !== "Unnamed"? props.contactFirstName : ""}
                        onChange={props.formChangeHandler}
                        />
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="contactLastName" 
                        label="Last Name" value={props.contactLastName !== "Contact"? props.contactLastName : ""}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="spouseFirstName" label="Spouse First Name"
                        value={props.spouseFirtName}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="spouseLastName" label="Spouse Last Name"
                        value={props.spouseLastName}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="email" label="Email"
                        value={props.email}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="phoneHome" label="Phone(Home)"
                        value={props.phoneHome}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="phoneMobile" label="Phone(Mobile)"
                        value={props.phoneMobile}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="phoneOther" label="Phone(Other)"
                        value={props.phoneOther}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="company" label="Company"
                        value={props.company}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="birthday" label="Birthday"
                        value={props.birthday}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="website" label="Website"
                        value={props.website}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <div className={classes.privateNote}>
                            <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="privateNote" label="Private Note"
                            d="outlined-multiline-flexible" multiline rowsMax="4"
                            value={props.privateNote}
                            onChange={props.formChangeHandler}/>
                        </div>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="streetAddress" label="Street Address"
                        value={props.streetAddress}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="city" label="City"
                        value={props.city !== "Unknown City"? props.city : ""}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="state" label="State"
                        value={props.state}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="zip" label="Zip"
                        value={props.zip}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
            </tbody>
        </table>

    )
    
}

export default ContactForm