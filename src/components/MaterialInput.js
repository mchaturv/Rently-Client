// Author - Vikram Singh (vikram.singh@dal.ca)

import React, {useState} from 'react';
import '../App.css';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';

const MaterialInput = (props) => {
    const [value, setValue] = useState("");

    let marginTop = props.marginTop || 0;
    let marginRight = props.marginRight || 0;
    let marginBottom = props.marginBottom || 0;
    let marginLeft = props.marginLeft || 0;
    let width = props.width || "100%";

    const useStyles = makeStyles((theme) => ({
        textfield: {
            marginTop: theme.spacing(marginTop),
            marginRight: theme.spacing(marginRight),
            marginBottom: theme.spacing(marginBottom),
            marginLeft: theme.spacing(marginLeft),
            width: width
        }
    }));

    const classes = useStyles();
    return (
        <TextField error={props.formValidate && value == "" ? true : false}
                   onChange={e => {
            setValue(e.target.value)
        }}
                   className={classes.textfield} label={props.text} variant="outlined" size="small"
                   fullWidth={true}/>
    )
};

export default MaterialInput;
