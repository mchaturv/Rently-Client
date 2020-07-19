import React, { Component } from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import {Card} from '@material-ui/core';


function MaterialCard(props){
    let paddingTop= props.paddingTop || 2;
    let paddingRight= props.paddingRight || 2;
    let paddingBottom= props.paddingBottom || 2;
    let paddingLeft= props.paddingLeft || 2;
    let width=props.width;
    let color=props.color || '#f5f5f5';

    const useStyles=makeStyles((theme) => ({
        card: {
            background: color,
            paddingTop: theme.spacing(paddingTop),
            paddingRight: theme.spacing(paddingRight),
            paddingBottom: theme.spacing(paddingBottom),
            paddingLeft: theme.spacing(paddingLeft),
            width:width
        }
    }));
    const classes = useStyles();
    return(
        <Card className={classes.card} raised={props.raised}>
            {props.children}
        </Card>
    )
};

export default MaterialCard;
