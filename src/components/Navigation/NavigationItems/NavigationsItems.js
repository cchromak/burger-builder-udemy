import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >Burger builder</NavigationItem>
        <NavigationItem link="/" >Check out</NavigationItem>
        
    </ul>
);

export default navigationItems;