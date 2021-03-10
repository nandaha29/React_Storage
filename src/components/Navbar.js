import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Grid, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CollectionsIcon from '@material-ui/icons/Collections';
import User from './UseUser';

const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: '#fff',
    },
    title: {
        color: '#008891',
    },
    link: {
        float: 'left',
        marginTop: '12px',
        marginRight: '5px',
    },
}))


export default function Header() {
    
    const classes = useStyles();
    
    return (
        
        <AppBar position='static' className={classes.root}>
            <Toolbar>
                <Container>
                <Grid container alignItems="center">
                    <Grid item> 
                        <Typography className={classes.title} variant="h6" noWrap>
                            My React Storage
                        </Typography>
                    </Grid>

                    <Grid item sm></Grid> {/* utk -> jarak*/}

                    <Grid item > 
                    
                    {/* OUTPUT NYA */}
                    <Typography color="textPrimary" className={classes.link}>
                        Hai' { }
                        <User />
                    </Typography>

                        <IconButton component={Link} to="/">
                            <CollectionsIcon fontSize="small" />
                        </IconButton>
                        <IconButton component={Link} to="/Cart">
                            <ShoppingCartIcon fontSize="small" />
                        </IconButton>
                    </Grid>

                </Grid>
                </Container>
            </Toolbar>
        </AppBar>
    )
}