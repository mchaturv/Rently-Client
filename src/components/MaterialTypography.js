// Author - Vikram Singh (vikram.singh@dal.ca)

import React from 'react';
import {Typography} from "@material-ui/core";
import {makeStyles, withStyles} from "@material-ui/core/styles";

const MaterialTypography = (props) => {
    let paddingTop= props.paddingTop || 2;
    let paddingRight= props.paddingRight || 2;
    let paddingBottom= props.paddingBottom || 2;
    let paddingLeft= props.paddingLeft || 2;

    const useStyles=makeStyles((theme) => ({
        Typography: {
            padding:theme.spacing(4),
            paddingTop: theme.spacing(paddingTop),
            paddingRight: theme.spacing(paddingRight),
            paddingBottom: theme.spacing(paddingBottom),
            paddingLeft: theme.spacing(paddingLeft)
        }
    }));
    const classes=useStyles();
    return(
        <Typography className={classes.Typography} variant={props.variant} align={props.align} color={props.color}>{props.text}</Typography>
    )
}

export default MaterialTypography;
