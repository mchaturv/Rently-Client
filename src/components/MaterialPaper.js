import React, { Component } from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import {Paper} from '@material-ui/core';


function MaterialPaper(props){
    let paddingTop= props.paddingTop || 2;
    let paddingRight= props.paddingRight || 2;
    let paddingBottom= props.paddingBottom || 2;
    let paddingLeft= props.paddingLeft || 2;

    const useStyles=makeStyles((theme) => ({
        paper: {
            background: '#f5f5f5',
            paddingTop: theme.spacing(paddingTop),
            paddingRight: theme.spacing(paddingRight),
            paddingBottom: theme.spacing(paddingBottom),
            paddingLeft: theme.spacing(paddingLeft)
        }
    }));
    const classes = useStyles();
        return(
            <Paper className={classes.paper}>
                {props.children}
            </Paper>
        )
};

export default MaterialPaper;
