import React from 'react';
import '../App.css';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

const MaterialSelect = (props) => {
    let marginTop= props.marginTop || 0;
    let marginRight= props.marginRight || 0;
    let marginBottom= props.marginBottom || 0;
    let marginLeft= props.marginLeft || 0;
    let width=props.width || "100%";

    const useStyles=makeStyles((theme) => ({
        root: {
            marginTop: theme.spacing(marginTop),
            marginRight: theme.spacing(marginRight),
            marginBottom: theme.spacing(marginBottom),
            marginLeft: theme.spacing(marginLeft),
            width:width
        }
    }));

    const classes = useStyles();

    const [value, setValue] = React.useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl variant="outlined" className={classes.root} size={"small"} error={props.formValidate && value == "" ? true : false}>
            {
                props.text && <InputLabel htmlFor="outlined-age-native-simple">{props.text}</InputLabel>
            }
            <Select
                native
                onChange={handleChange}
                label={props.text ? props.text : undefined}
                inputProps={{
                    name: `${props.text}`,
                    id: 'outlined-age-native-simple',
                }}>
                <option aria-label="None" value="" />
                {
                    props.text!="Country" &&
                    <React.Fragment>
                    <option value={10}>$</option>
                    <option value={10}>€</option>
                    <option value={10}>¥</option>
                        </React.Fragment>
                }
                {
                    props.text=="Country" &&
                        <React.Fragment>
                            <option value={10}>Canada</option>
                            <option value={30}>USA</option>
                            <option value={20}>India</option>
                            <option value={30}>Italy</option>
                            <option value={30}>Kenya</option>
                            <option value={30}>Russia</option>
                            <option value={30}>South Africa</option>
                            <option value={30}>Singapore</option>
                        </React.Fragment>
                }
            </Select>
        </FormControl>
    )
};

export default MaterialSelect;