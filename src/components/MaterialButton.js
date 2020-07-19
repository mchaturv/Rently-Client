import React from 'react';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const CustomButton = withStyles({
    label: {
        color:'#ffffff',
        fontSize: 'medium',
        textTransform: 'initial'
    }
})(Button);

const MaterialButton = (props) => {
    return (
        <CustomButton variant="contained" color="primary" onClick={()=>{props.callback(true)}}>{props.text}</CustomButton>
    )
};

export default MaterialButton;
