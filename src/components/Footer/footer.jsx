import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from '@material-ui/core';
import { Box } from '@material-ui/core';

const Footer = (props) => {
    function Copyright() {
        return (
          <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
              Into The Woods
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        );
      }
    return (
        <Box mt={5}>
            <Copyright />
        </Box>
    )
}
export default Footer;