// Author - Vikram Singh (vikram.singh@dal.ca)

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
    let variant = props.variant || "contained";
    let callbackObject = props.callbackObject || {};
    return (
        <React.Fragment>
            {
                <CustomButton variant={variant} color="primary" onClick={()=>{props.callback(true, callbackObject)}}>{props.text}</CustomButton>
            }
        </React.Fragment>
    )
};

export default MaterialButton;
