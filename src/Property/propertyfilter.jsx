import { Fragment } from 'react'
import './propertyfilter.css';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

class PropertyFilter extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filter: {
                propertyTypeFilter: props.filter.propertyTypeFilter,
                bedroomFilter: props.filter.bedroomFilter,
                bathroomFilter: props.filter.bathroomFilter,
                priceValueFilter: props.filter.priceValueFilter

            },
            priceValue: props.filter.priceValueFilter,
            propertyType: props.filter.propertyTypeFilter,
            bedroom: props.filter.bedroomFilter,
            bathroom: props.filter.bathroomFilter,

            errormessage: ""
        };
    }

    handleChange = (event, newValue) => {
        this.setState({
            priceValue: newValue
        })

    };

    myChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        if (this.state.propertyType === "Property Type" && this.state.bedroom === 0 && this.state.bathroom === 0) {
            this.setState({
                errormessage: "Please apply filter"
            });
        }
        else {
            this.setState({
                filter: {
                    priceValueFilter: this.state.priceValue,
                    propertyTypeFilter: this.state.propertyType,
                    bedroomFilter: this.state.bedroom,
                    bathroomFilter: this.state.bathroom
                },
            },
                () => {
                    this.setState({
                        errormessage: ""
                    });
                    this.props.onFilterClick(this.state.filter);
                });
        }
    }

    valuetext(priceValue) {
        return `${priceValue}$`;
    }

    render() {
        return (
            <Fragment>
                <div className="property-filter">
                    <h4>Filter Property</h4>
                    <div className="filter-icon">
                        <i className="fa fa-filter"></i>
                    </div>
                    <form onSubmit={this.mySubmitHandler} className="filter-form">

                        <select className="form-control select-filter" name="propertyType" value={this.state.propertyType} placeholder="Type" id="propertyType" onChange={this.myChangeHandler}>
                            <option>Property Type</option>
                            <option>Apartment</option>
                            <option>Villa</option>
                            <option>Condos</option>
                            <option>Farm House</option>
                        </select>

                        <select className="form-control select-filter" name="bedroom" value={this.state.bedroom} placeholder="Bedroom" id="bedroom" onChange={this.myChangeHandler}>
                            <option value="0">Bedroom</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedroom</option>
                            <option value="3">3 Bedroom</option>
                            <option value="4">4 and more Bedroom</option>
                        </select>

                        <select className="form-control select-filter" name="bathroom" value={this.state.bathroom} placeholder="bathroom" id="exampleFormControlSelect1" onChange={this.myChangeHandler}>
                            <option value="0">Bathroom</option>
                            <option value="1">1 Bathroom</option>
                            <option value="2">2 Bathroom</option>
                            <option value="3">3 Bathroom</option>
                        </select>

                        <div className="filter-range">

                            <Typography style={{ marginBottom: '40px' }} id="range-slider" gutterBottom>
                                Price range ($):
                            </Typography>
                            <Slider
                                name="priceValue"
                                value={this.state.priceValue}
                                onChange={this.handleChange}
                                aria-labelledby="range-slider"
                                getAriaValueText={this.valuetext}
                                valueLabelDisplay="on"
                                max={10000}
                                step={500}
                                style={{ width: '95%',marginLeft:'1px'}}
                            />
                        </div>
                        <div style={{ marginBottom: '10px' }}>
                            <strong style={{ color: 'red', marginBottom: '10px' }}>{this.state.errormessage}</strong>
                        </div>
                        <button type="submit" className="filter-btn" >Filter Property</button>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default PropertyFilter;