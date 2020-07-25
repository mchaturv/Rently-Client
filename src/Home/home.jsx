
import React, { Fragment } from 'react'
import '../Home/home.css';
import '../molecules/footer.css'
import Footer from '../molecules/footer'
import Header from '../molecules/Header'
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";
import axios from 'axios';

class Home extends React.Component {

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
      searchstate:{
        latattribute:43.691351,
        lngattribute:-79.458748,
        showsearch:false
      }
      
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
   // this.searchPropertyForCurrentLocation();
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
      searchstate:{
        latattribute:latValue,
        lngattribute:lngValue,
        showsearch:true
      }
    },
      () => {
          this.handleModalOpen();
      });
    }


  handleModalOpen =() => {
    console.log("here to search ");
    console.log(this.state.searchstate);
    
    this.props.history.push({
      pathname: '/properties',
      state: {searchdetails : this.state.searchstate}
    })
  }

  render() {
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
    return (
      <Fragment>
        <Header></Header>
        <div className="home-container">
          <section className="hbgimage">
            <div className="container">
              <div className="row heading">

              <div className="container">
                <div className="row">
                  <div className="search-containers">
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
                      
                    </form>
                  </div>
                </div>
              </div>

              </div>
            </div>
          </section>
          <section className="howit-works">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title">
                    <p><b>Rently</b> is platform that allows you to look out for the desirable properties of your choice at your convience and desirable rate throughout the beautiful cities and location in the world </p>
                    <hr></hr>
                    <span>Find Perfect House For Yourself</span>
                    <h2>How It Works</h2>
                    <hr></hr>
                  </div>
                </div>
              </div>
              <div className="row" style={{marginTop:'10px',marginBottom:'20px'}}>
                <div className="col-lg-4">
                  <div className="single-howit-works">
                    <img src={require('../images/search.png')} alt="" />
                    <h4>Search &amp;<br></br> Find House</h4>
                    <p>Search for houses at desirable and convenient location </p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-howit-works">
                    <img src={require('../images/location.png')} alt="" />
                    <h4>Filter &amp; Select <br></br>house of your choice</h4>
                    <p>Select a house by filtering and sorting out the search result by customized filters to get to your sortlisted properties.</p>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-howit-works">
                    <img src={require('../images/contract.png')} alt="" />
                    <h4>Talk To owner &amp;<br></br> make a deal</h4>
                    <p>Contact the Owner, fix an appointment to visit the house and finalize it.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer/>
          
        </div>
      </Fragment>
    );
  }
}

export default Home;
