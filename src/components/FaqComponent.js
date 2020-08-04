// Author - Vikram Singh (vikram.singh@dal.ca)

import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {Box} from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "100%",
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    expansionPanelRoot: {
        width: '100%',
    },
    expansionPanel: {
        background: theme.palette.secondary.main
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    }
}));

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


const FaqComponent = (props) => {
    const [questions, setQuestions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");

    useEffect(() => {
        // equivalent to "ComponentDidMount"
        if(questions.length==0){
            fetch(`${process.env.REACT_APP_API_URL}/faqs/getAllFaqs`)
                .then(response=>response.json())
                .then(response=>{
                    setQuestions(response);
                })
                .catch(err=>console.log(err))
        }
    });
    const classes = useStyles();

    const getSuggestions = (value) => {

        const escapedValue = escapeRegexCharacters(value.trim());

        const regex = new RegExp(escapedValue, 'i');
        let string = [];
        questions.filter(question => {
            if (regex.test(question.query)) {
                string.push(
                    <ExpansionPanel className={classes.expansionPanel} key={question.query}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>{question.query}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>{question.reply}</Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            }
        });
        return string;
    }

    getSuggestions.bind(this)

    return (
        <React.Fragment>
            <Card className={classes.card} raised={true}>
                <InputBase
                    className={classes.input}
                    placeholder="Search your question"
                    onChange={({target}) => {
                        console.log(target.value);
                        setInputValue(target.value);
                    }}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    <SearchIcon/>
                </IconButton>
            </Card>
            <Box mt={3} className={classes.expansionPanelRoot}>
                {
                    getSuggestions(inputValue)
                }
            </Box>
        </React.Fragment>
    )
};

export default FaqComponent;
