// Author - Vikram Singh (vikram.singh@dal.ca)

import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";

export default function MaterialNormalSlider(props) {
    let paddingTop= props.paddingTop || 2;
    let paddingRight= props.paddingRight || 2;
    let paddingBottom= props.paddingBottom || 2;
    let paddingLeft= props.paddingLeft || 2;

    const useStyles=makeStyles((theme) => ({
        root: {
            width: "100%",
            paddingTop: theme.spacing(paddingTop),
            paddingRight: theme.spacing(paddingRight),
            paddingBottom: theme.spacing(paddingBottom),
            paddingLeft: theme.spacing(paddingLeft)
        }
    }));
    const classes = useStyles();
    const [value, setValue] = React.useState(10);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid container alignItems="flex-end">
                <Typography variant={"h6"}>
                    Search radius
                </Typography>
                <Typography variant={"subtitle1"} color="textSecondary">&nbsp;&nbsp;&nbsp;&nbsp;{value} km</Typography>
            </Grid>
            <Slider
                value={value}
                min={0}
                step={1}
                max={50}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby="non-linear-slider"
            />
        </div>
    );
}
