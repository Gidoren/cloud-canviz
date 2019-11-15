import React, {Component} from 'react'
import classes from './CrmNavbar.module.css';
import Item from './Item/Item'
class CrmNavbar extends Component {
    render(){
        return (
            <div className={classes.navbar}>
                <Item>Dashboard</Item>
                <Item>Inventory</Item>
                <Item>Contacts</Item>
            </div>
        )
    }

}

export default CrmNavbar