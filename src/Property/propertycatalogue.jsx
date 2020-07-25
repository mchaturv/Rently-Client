import React, { Component } from 'react';
import { Fragment } from 'react';
import './propertycatalogue.css';
import Header from '../molecules/Header'
import Footer from '../molecules/footer';
import PropertyCard from './propertycard.jsx'
import PropertyFilter from './propertyfilter.jsx'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import Modal from './ModalSetup';

var api = "https://rently-services-group13.herokuapp.com/api/properties/";

class PropertyCatalogue extends Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      mapPosition: {
        lat: 44.6461676,
        lng: -63.7029374
      },
      markerPosition: {
        lat: 44.6461676,
        lng: -63.7029374
      },

      showSearchResult: false,
      activeSearchIndex: 0,
      properties: [],
      children: '',
      filter: {
        propertyTypeFilter: 'Property Type',
        bedroomFilter: 0,
        bathroomFilter: 0,
        priceValueFilter: [0, 10000]

      },
      isShowing: false
    }

  }


  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
      });

    }
    Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
      response => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);

        this.setState({
          address: (address) ? address : '',
          area: (area) ? area : '',
          city: (city) ? city : '',
          state: (state) ? state : '',
        })
      },
      error => {
        console.error(error);
      }
    );
    this.searchPropertyForCurrentLocation();
  }

  /**
  * Get the city and set the city input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
  getCity = (addressArray) => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
  * Get the area and set the area input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
  getArea = (addressArray) => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
  * Get the address and set the address input value to the one selected
  *
  * @param addressArray
  * @return {string}
  */
  getState = (addressArray) => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  searchPropertyForCurrentLocation() {
    axios.get(api + 'allNearByProperties', {
      params: {
        lat: this.state.markerPosition.lat,
        lng: this.state.markerPosition.lng
      }
    }).then(response => {
      const searchResult = response.data;
      this.setState({ properties: searchResult, showSearchResult: true, activeSearchIndex: 0 })
    }).catch(error => {
      this.setState({ error: true })
    })
  };

  searchFilteredProperty(body) {
    axios.get(api + 'filterallNearByProperties', {
      params: {
        propertyType: ((this.state.filter.propertyTypeFilter === 'Property Type') ? '.*.' : this.state.filter.propertyTypeFilter),
        bedroom: this.state.filter.bedroomFilter,
        bathroom: this.state.filter.bathroomFilter,
        minpriceRange: this.state.filter.priceValueFilter[0],
        maxpriceRange: this.state.filter.priceValueFilter[1],
        lat: this.state.markerPosition.lat,
        lng: this.state.markerPosition.lng
      }
    }
    ).then(response => {
      const searchResult = response.data;
      this.setState({ properties: searchResult, showSearchResult: true, activeSearchIndex: 0 })
    }).catch(error => {
      this.setState({ error: true })
    })
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.place_,
      selectedLink: props.link,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  

  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      address: (address) ? address : '',
      area: (area) ? area : '',
      city: (city) ? city : '',
      state: (state) ? state : '',
      markerPosition: {
        lat: latValue,
        lng: lngValue
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue
      },
    })
    this.searchPropertyForCurrentLocation();
  };


  openModalHandler = (property) => {
    this.setState({
      isShowing: true,
      propertyDetails: property
    });

  }

  closeModalHandler = () => {
    this.setState({
      isShowing: false
    });
  }

  filterProperties = (filterValues) => {
    this.setState({
      filter: {
        propertyTypeFilter: filterValues.propertyTypeFilter,
        bedroomFilter: filterValues.bedroomFilter,
        bathroomFilter: filterValues.bathroomFilter,
        priceValueFilter: filterValues.priceValueFilter
      }
    },
      () => {
        if (!(this.state.filter.propertyTypeFilter == 'Apartment' && this.state.filter.bedroomFilter == 'Bedrooms'
          && this.state.filter.bathroomFilter == 'Bathrooms' && this.state.filter.priceValueFilter == [0, 10000])) {
          this.searchFilteredProperty();
        }

      }
    );
  }

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  scrollFunction() {
    var mybutton = document.getElementById("topBtn");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  render() {
    
    window.onscroll = this.scrollFunction;
    
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap google={this.props.google}
            defaultZoom={this.props.zoom}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
          >
            {/* For Auto complete Search Box */}
            <Autocomplete
              style={{
                height: '60px',
                paddingLeft: '47px',
                color: '#995fc5',
                fontStyle: 'italic',
                border: 'none'
              }}
              placeholder="search with city or postal code"
              onPlaceSelected={this.onPlaceSelected}
              types={['(regions)']}
            />
            {/*Marker*/}
            <Marker google={this.props.google}
              name={'Dolores park'}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
            />
            <Marker />
            {/* InfoWindow on top of marker */}
            <InfoWindow
              onClose={this.onInfoWindowClose}
              position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
            >
              <div>
                <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
              </div>
            </InfoWindow>
          </GoogleMap>
        )
      )
    );
    let body;
    body =
      <Fragment >
        <div className="catalogue-container">
        <Header />
        {this.state.isShowing &&
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal"
            propertyDetails={this.state.propertyDetails}
            show={this.state.isShowing}
            close={this.closeModalHandler}
            onHide={this.closeModalHandler}>
          </Modal>
        }
        <div className="container">
          <div className="row">
            <div className="search-container">
              <form className="property-search-form" >

                <div className="search-input">
                  <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTOah98FDMQHJVNk7oRe_kjKdZ_XYIUd4&libraries=places"
                    loadingElement={
                      <div style={{ height: `200%`, width: '-webkit-fill-available' }} />
                    }
                    containerElement={
                      <div style={{ height: '200%', width: '-webkit-fill-available' }} />
                    }
                    mapElement={
                      <div style={{ height: `200%`, width: '-webkit-fill-available' }} />
                    }
                  />
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. </p>
              </form>
            </div>
          </div>
        </div>
        <section className="cards">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                {/* using the property filter component to display filter section */}
                <PropertyFilter filter={this.state.filter} onFilterClick={this.filterProperties.bind(this)} />
              </div>
              {this.state.showSearchResult ?

                <div className="col-lg-9">
                  {this.state.properties.length > 0 ?
                    <div>
                      <h4 className="property-title">Property</h4>
                      <div className="property-list">
                        {/* using the property filter component to display list of property in card view */}
                        {this.state.properties.map((item, index) =>
                          <PropertyCard key={index}
                            onPropertyClick={this.openModalHandler.bind(this, item)}
                            property={item} />

                        )}
                      </div>
                    </div>
                    :
                    <div>
                      <h1 className="property-title">No Search Result Found</h1>
                    </div>
                  }

                </div>
                :
                <div className="col-lg-9" style={{ marginTop: '20px' }, { textAlign: "center", color: '#995fc5' }}>
                  <>
                    <Spinner animation="border" size="lg" />
                    <Spinner animation="border" />
                    <Spinner animation="grow" size="xl" />
                    <Spinner animation="grow" />
                  </>
                  <h4>Loading...</h4>
                </div>
              }
            </div>
          </div>
          <button onClick={this.topFunction} id="topBtn" title="Go to top"><i className="fa fa-arrow-up" aria-hidden="true"></i></button>
        </section>

        <Footer />
        </div>
      </Fragment>
    return (body);
  }
};

export default PropertyCatalogue;