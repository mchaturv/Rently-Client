import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Grid from "@material-ui/core/Grid";

function valuetext(value) {
    return `$${value}`;
}

export default function MaterialRangeSlider(props) {
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
    const [value, setValue] = React.useState([1000, 2000]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Grid container alignItems="flex-end">
                <Typography id="range-slider" variant={"h6"}>
                    Price range:&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                <Typography variant={"subtitle1"} color="textSecondary">${value[0]} &nbsp;&nbsp;&nbsp;– &nbsp;&nbsp;&nbsp;${value[1]}</Typography>
            </Grid>


            <Slider
                value={value}
                onChange={handleChange}
                min={0}
                step={1}
                max={10000}
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
            />
        </div>
    );
}