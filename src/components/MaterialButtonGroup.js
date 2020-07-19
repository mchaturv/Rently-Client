import React, { Component } from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";


function MaterialCard(props){
    let paddingTop= props.paddingTop || 2;
    let paddingRight= props.paddingRight || 2;
    let paddingBottom= props.paddingBottom || 2;
    let paddingLeft= props.paddingLeft || 2;

    const useStyles=makeStyles((theme) => ({
        buttonGroup: {
            paddingTop: theme.spacing(paddingTop),
            paddingRight: theme.spacing(paddingRight),
            paddingBottom: theme.spacing(paddingBottom),
            paddingLeft: theme.spacing(paddingLeft)
        },
        label:{
            textTransform: 'initial'
        }
    }));
    const classes = useStyles();

    const [value, setValue] = React.useState('left');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <ToggleButtonGroup value={value} exclusive onChange={handleChange} className={classes.buttonGroup} aria-label="outlined primary button group">
            <ToggleButton className={classes.label} value={"House"}>House</ToggleButton>
            <ToggleButton className={classes.label} value={"Condo"}>Condo</ToggleButton>
            <ToggleButton className={classes.label} value={"Room"}>Room</ToggleButton>
        </ToggleButtonGroup>
    )
};

export default MaterialCard;
