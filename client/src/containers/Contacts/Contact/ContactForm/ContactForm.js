import React from 'react'
import classes from './ContactForm.module.css'
import StyledTextField from '../../../../components/StyledTextField/StyleTextField'

const ContactForm = (props) => {
    return (
        <table data-aos="slide-up" className={classes.table}>
            <tbody>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField error={props.contactFirstName === '' || props.contactFirstName === "Unnamed" ? true: false} 
                        helperText={props.contactFirstName === '' || props.contactFirstName === "Unnamed" ? "required": ''} 
                        className={classes.textField} margin="normal" variant="outlined" name="contactFirstName"
                        label="First Name" value={props.contactFirstName !== "Unnamed"? props.contactFirstName : ""}
                        onChange={props.formChangeHandler}
                        />
                    </th>
                    <th className={classes.th}>
                        <StyledTextField error={props.contactLastName === '' || props.contactLastName === "Contact" ? true: false} 
                        helperText={props.contactLastName === '' || props.contactLastName== "Contact" ? "required": ''}
                        className={classes.textField} margin="normal" variant="outlined" name="contactLastName" 
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
                        error={props.email === '' || props.email === "Unknown@email.com" ? true: !/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm.test(props.email) ? true: false} 
                        helperText={props.email === '' || props.email === "Unknown@email.com"? "required": !/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm.test(props.email) ? 'invalid email': ''}
                        value={props.email !== "Unknown@email.com"? props.email : ""}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="phoneHome" label="Phone(Home)"
                        error={props.phoneHome === '' || props.phoneHome === "Unknown Phone" ? true: !/^\d{10}$/.test(props.phoneHome) ? true: false} 
                        helperText={props.phoneHome === '' || props.phoneHome === "Unknown Phone" ? "required": !/^\d{10}$/.test(props.phoneHome) ? "invalid phone": ''}
                        value={props.phoneHome !== "Unknown Phone"? props.phoneHome : ""}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="phoneMobile" label="Phone(Mobile)"
                        error={!/^\d{10}$/.test(props.phoneMobile) && (props.phoneMobile !== '') ? true: false} 
                        helperText={!/^\d{10}$/.test(props.phoneMobile) && (props.phoneMobile !== '') ? "invalid phone": ''}
                        value={props.phoneMobile}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="phoneOther" label="Phone(Other)"
                        error={!/^\d{10}$/.test(props.phoneOther) && (props.phoneOther !== '')? true: false} 
                        helperText={!/^\d{10}$/.test(props.phoneOther) && (props.phoneOther !== '')? "invalid phone": ''}
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
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="birthday" label="Birthday MM/DD/YYYY"
                        error={!/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(props.birthday) && (props.birthday !== '')? true: false} 
                        helperText={!/^\d{2}[./-]\d{2}[./-]\d{4}$/.test(props.birthday) && (props.birthday !== '')? "invalid birthday": ''}
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
                        error={!/^\s*\S+(?:\s+\S+){2}/.test(props.streetAddress) && (props.streetAddress !== '')? true: false} 
                        helperText={!/^\s*\S+(?:\s+\S+){2}/.test(props.streetAddress) && (props.streetAddress !== '')? "invalid street address": ''}
                        value={props.streetAddress}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="city" label="City"
                        error={!/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/.test(props.city) && (props.city !== '' && props.city !== "Unknown City")? true: false} 
                        helperText={!/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/.test(props.city) && (props.city !== '' && props.city != "Unknown City")? "invalid city": ''}
                        value={props.city !== "Unknown City"? props.city : ""}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
                <tr className={classes.tr}>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="state" label="State"
                        error={!/^\S{2}$/.test(props.state) && (props.state !== '')? true: false} 
                        helperText={!/^\S{2}$/.test(props.state) && (props.state !== '')? "invalid state": ''}
                        value={props.state}
                        onChange={props.formChangeHandler}/>
                    </th>
                    <th className={classes.th}>
                        <StyledTextField className={classes.textField} margin="normal" variant="outlined" name="zip" label="Zip"
                        error={!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(props.zip) && (props.zip !== '')? true: false} 
                        helperText={!/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(props.zip) && (props.zip !== '')? "invalid zip": ''}
                        value={props.zip}
                        onChange={props.formChangeHandler}/>
                    </th>
                </tr>
            </tbody>
        </table>

    )
    
}

export default ContactForm