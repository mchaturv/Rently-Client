import React, { Fragment } from 'react'
import '../Property/propertycatalogue.css';


class PropertySearch extends React.Component {
    constructor() {
        super();
        this.state = {
        };
        //this.onSubmitForm = this.onSubmitForm.bind(this);
    }
    
    onSubmitForm() {
        this.props.onFormSubmit()
    }

    onPlaceSelected = ( place ) => {
        this.props.onPlaceSelected(place)
    }


    render() {
        return (
            <Fragment>
                    <div class="container">
                        <div class="row">
                        <div class="search-container">
                            <form class="property-search-form" >
                                
                                <div class="search-input">
                                    {/* <input type="text" placeholder="Search by location, city, state, postcode" required='true'/> */}
                                    <Autocomplete placeholder="Search by location, city, state, postcode" required='true'
                                            onPlaceSelected={ this.onPlaceSelected }
                                            /> 
                                     <button class="search-btn" onClick={this.onSubmitForm}>Search</button>
                                </div>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
                            </form>
                        </div>
                        </div>
                    </div>  
            </Fragment>
    );
  }
}

export default PropertySearch;