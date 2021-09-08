import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerSubtitle } from '@rmwc/drawer';
import { List, ListItem, Button } from "@material-ui/core";
import '@rmwc/drawer/styles';

const NavBar = (props) => {
  const [open, setOpen] = useState(false);

  return (

    <>
      {/** Make the drawer appear right-to-left */}
      <Drawer
        dir='ltr'
        modal
        open={open}
        onClose={() => setOpen(false)}
      >
        {/** Set the content back to left-to-right */}
        <DrawerHeader dir="ltr">
          <DrawerTitle>In The Woods</DrawerTitle>
          <DrawerSubtitle>Menu</DrawerSubtitle>
        </DrawerHeader>

        <DrawerContent dir="ltr">
          <List>
            <ListItem>
              <Link to='/home'>Home</Link>
            </ListItem>
            <ListItem>
              <Link to='/register'>Register</Link>
            </ListItem>
            <ListItem>
              <Link to='/login'>Login</Link>
            </ListItem>
            <ListItem>
              <Link to='/profile'>Profile</Link>
            </ListItem>
            <ListItem>
              <Link to='/document'>Documents</Link>
            </ListItem>
            <ListItem>
              <Link to='/department'>Departments</Link>
            </ListItem>
            <ListItem>
              <Link to='/event'>Events</Link>
            </ListItem>
            <ListItem>
              <Link to='/map'>Event Map</Link>
            </ListItem>
            <ListItem>
              <Link to='/calendar'>Calendar</Link>
            </ListItem>
            <ListItem>
              <Link to='/logout'>Logout</Link>
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer>

      <Button onClick={() => setOpen(!open)} raised>
        Navigation
      </Button>
    </>
  );
}

export default NavBar;