import AutoSuggest from 'react-autosuggest';
import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";

const theme = {
    container: {
        position: 'relative'
    },
    input: {
        width: "100%",
        height: 30,
        padding: '10px 20px',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 300,
        fontSize: 18,
        border: 'none',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
    },
    inputFocused: {
        outline: 'none'
    },
    inputOpen: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    suggestionsContainer: {
        display: 'none'
    },
    suggestionsContainerOpen: {
        display: 'block',
        position: 'absolute',
        width: "100%",
        top: 51,
        border: 'none',
        backgroundColor: '#fff',
        fontFamily: 'Helvetica, sans-serif',
        fontWeight: 300,
        fontSize: 18,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        zIndex: 2,
        boxShadow: "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)"
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none'
    },
    suggestion: {
        cursor: 'pointer',
        padding: '10px 20px'
    },
    suggestionHighlighted: {
        backgroundColor: '#ddd'
    }
};

const languages = [
    {
        name: 'Halifax, NS'
    },
    {
        name: 'Toronto, ON'
    },
    {
        name: 'Vancouver, BC'
    },
    {
        name: 'Edmonton, AB'
    },
    {
        name: 'Ottawa, ON'
    },
    {
        name: 'Montreal, QC'
    },
    {
        name: 'Calgary, AB'
    },
    {
        name: 'New York, USA'
    },
    {
        name: 'New Delhi, India'
    },
    {
        name: 'Frankfurt, Germany'
    },
    {
        name: 'Brussels, Belgium'
    },
    {
        name: 'Paris, France'
    },
    {
        name: 'Rome, Italy'
    },
    {
        name: 'Berlin, Germany'
    }
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}
const MainSearchField = (props) => {

    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    console.log();
    useEffect(() => {
        // equivalent to "ComponentDidMount"
    });

    theme.container.width = props.widthPercent + "%";

    const inputProps = {
        placeholder: props.placeholder,
        value,
        onChange:(event, {newValue}) => {
            setValue(newValue);
            props.callback();
        }
    };

    return (
        <React.Fragment>
                <AutoSuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={({value}) => {
                        setSuggestions(getSuggestions(value));
                    }}
                    onSuggestionsClearRequested={() => {
                        setSuggestions([]);
                    }}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    theme={theme}
                />
            <div>
                <IconButton type="submit" style={{padding:10,top:0, right:0, position:"relative"}} aria-label="search" onClick={props.callback}>
                <SearchIcon />
            </IconButton></div>
        </React.Fragment>

    );

};

export default MainSearchField;