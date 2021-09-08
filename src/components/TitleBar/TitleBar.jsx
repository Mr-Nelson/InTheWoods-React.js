import React from 'react';
import NavBar from '../NavBar/navBar';
import "@rmwc/top-app-bar/dist/styles";
import {
  TopAppBar,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
  TopAppBarFixedAdjust
} from "@rmwc/top-app-bar";
import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';


const TitleBar = (props) => {

    return (
        <>
            <TopAppBar prominent color='primary'>
                <TopAppBarRow>
                    <TopAppBarSection>
                        <TopAppBarTitle >  
                            <Typography component="h1" variant="h8">
                                Into The Woods
                            </Typography>
                        </TopAppBarTitle>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBar short>
                <NavBar />
            </TopAppBar>
            <TopAppBarFixedAdjust />
        </>
    );
}

export default TitleBar;