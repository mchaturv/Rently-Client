import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
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
import 'react-fontawesome'
import Fontawesome from 'react-fontawesome'
import { GoogleAPI } from "google-maps-react";
import { fontSize, positions } from '@material-ui/system';


var api = "https://rently-services-group13.herokuapp.com/api/properties/";

var searchDetails;
var userlat;
var userlng;

class PropertyCatalogue extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      address: '',
      city: '',
      area: '',
      state: '',
      mapPosition: {
        lat: 43.691351,
        lng: -79.458748
      },
      markerPosition: {
        lat: 43.691351,
        lng: -79.458748
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

    this.onMapClick = this.onMapClick.bind(this);
    this.searchPropertyForCurrentLocation = this.searchPropertyForCurrentLocation.bind(this);

  }


  componentDidMount() {
    
    if(!(typeof this.props.location.state =="undefined"))
    {
      console.log("search from home")
      searchDetails=this.props.location.state.searchdetails;
      Geocode.fromLatLng(searchDetails.latattribute, searchDetails.lngattribute).then(
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
            markerPosition: {
              lat: searchDetails.latattribute,
              lng: searchDetails.lngattribute
            },
            mapPosition: {
              lat: searchDetails.latattribute,
              lng: searchDetails.lngattribute
            }
          },
          () => {
            this.searchPropertyForLocation();
          });
        },
        error => {
          console.error(error);
        }
      );
    }
    else{
      console.log("fresh search")
      if (navigator.geolocation) {  
        console.log("accepted");    
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position.coords.latitude,position.coords.longitude)
            userlat = position.coords.latitude;
            userlng = position.coords.longitude; 
              
        },
        error => {
          console.error(error);
          this.searchPropertyForLocation();
        }
        
        );
      }
      else{
        console.log("denied")
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
        console.log("fetching for default location")
        this.searchPropertyForLocation();
      }
      console.log("geolocation" in navigator, this.props.isGeolocationEnabled)
    }
    console.log(userlat,userlng)
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

  searchPropertyForCurrentLocation(latatr,lngatr) {
    console.log("hitting api for current ",latatr,lngatr);
    axios.get(api + 'allNearByProperties', {
      params: {
        lat: 44.6461676,
        lng: -63.583630
      }
    }).then(response => {
      const searchResult = response.data;
      this.setState({ properties: searchResult, showSearchResult: true, activeSearchIndex: 0 })
    }).catch(error => {
      this.setState({ error: true })
    })
  };

  searchPropertyForLocation() {
    console.log("hitting api",this.state.markerPosition.lat,this.state.markerPosition.lng);
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

  onMarkerDragEnd = ( event ) => {
    console.log( 'event', event );
    let newLat = event.latLng.lat(),
     newLng = event.latLng.lng(),
     addressArray = [];
  Geocode.fromLatLng( newLat , newLng ).then(
     response => {
      const address = response.results[0].formatted_address,
       addressArray =  response.results[0].address_components,
       city = this.getCity( addressArray ),
       area = this.getArea( addressArray ),
       state = this.getState( addressArray );
  this.setState( {
       address: ( address ) ? address : '',
       area: ( area ) ? area : '',
       city: ( city ) ? city : '',
       state: ( state ) ? state : '',
       markerPosition: {
         lat: newLat,
         lng: newLng
       },
       mapPosition: {
         lat: newLat,
         lng: newLng
       }
      } )
     },
     error => {
      console.error(error);
     }
    );
    this.searchPropertyForLocation();
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
    this.searchPropertyForLocation();
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
  
  onMapClick() {
    var mybutton = document.getElementById("topBtn");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  takeToComponent(event,item) {
    var div = '#'+item.title;
    window.location.href=div;
    //event.preventDefault();
    //event.stopPropagation(); 

  }

  render() {
    
    window.onscroll = this.scrollFunction;
    
    const icon = () => (
      <Fontawesome
        className='fa fa-home'
        name='fa fa-home'
        size='2x'
        spin
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}/>
    );

    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap google={this.props.google}
            defaultZoom={12}
            defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }} 
          >
            {/* For Auto complete Search Box */}
            <Autocomplete
              style={{
                height: '45px',
                paddingLeft: '47px',
                color: '#995fc5',
                fontStyle: 'italic',
                border: 'none',
                margin:'3px',
                width:'-webkit-fill-available'
              }}
              placeholder="search with city or postal code"
              onPlaceSelected={this.onPlaceSelected}
              types={['(regions)']}
            />

            {this.state.properties.map((item, index) =>
         
              <Marker google={this.props.google}
                //key={index}
                draggable={true}
                onDragEnd={this.onMarkerDragEnd}
                position={{ lat: (item.geolocation.coordinates[0]+ 0.0010), lng: (item.geolocation.coordinates[1])}} 
                title={item.title}
                icon={{
                  path: "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z",
                  scale: 0.05,
                  size:'2px',
                  strokeWeight: 0,
                  scaledSize :0.001,
                 
                  // strokeColor: 'black',
                  // strokeOpacity: 1,
                  fillColor: '#995fc5',
                  fillOpacity: 1
                }}
                
                //onClick={(event)=>this.openModalHandler(event,item)}
                onClick={(event)=>this.takeToComponent(event,item)}
                >
                 
                </Marker>
                
            )}

            <Marker google={this.props.google}
                draggable={true}
                onDragEnd={this.onMarkerDragEnd}
                position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }} 
                name={'Dolores park'}>
                  </Marker>

            {this.state.properties.map((item, index) =>   
              <Fragment>
              <InfoWindow
                  key={index}
                  onClose={this.onInfoWindowClose}
                  position={{ lat: (item.geolocation.coordinates[0] + 0.0010), lng: item.geolocation.coordinates[1] }}
                > 
                <div>
                <span style={{ padding: 0, margin: 0, color:'#995fc5' }} >{item.title}</span>
               
                </div>
                </InfoWindow>
             </Fragment> 
            )}

            {/* InfoWindow on top of marker */}
            
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

              <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTOah98FDMQHJVNk7oRe_kjKdZ_XYIUd4&libraries=places"
                    loadingElement={
                      <div tyle={{ height: `100%`, width: '100%', position:"relative" }} />
                    }
                    containerElement={
                      <div style={{ height: '100%', width: '100%' ,position:"relative" }} />
                    }
                    mapElement={
                      <div style={{ height: `80%`, width: '100%',position:"relative" }} />
                    }
                  />
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
                          <PropertyCard key={index} id ={index}
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