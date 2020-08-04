import React, { Component } from "react";
import { Fragment } from "react";
import "./propertycatalogue.css";
import Header from "../molecules/Header";
import Footer from "../molecules/footer";
import PropertyCard from "./propertycard.jsx";
import PropertyFilter from "./propertyfilter.jsx";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
} from "react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Modal from "./ModalSetup";
import "react-fontawesome";

//var api = process.env.REACT_APP_API_URL + "/properties/";
var api = "https://rently-services-group13.herokuapp.com/api/properties/";
var favapi = "https://rently-services-group13.herokuapp.com/api/favourite";

var searchDetails;

class PropertyCatalogue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapPosition: {
        lat: 43.691351,
        lng: -79.458748,
      },
      markerPosition: {
        lat: 43.691351,
        lng: -79.458748,
      },

      showSearchResult: false,
      activeSearchIndex: 0,
      properties: [],
      favProperties: [],
      children: "",
      filter: {
        propertyTypeFilter: "Property Type",
        bedroomFilter: 0,
        bathroomFilter: 0,
        priceValueFilter: [0, 10000],
      },
      isShowing: false,
    };

    this.onMapClick = this.onMapClick.bind(this);
    this.searchPropertyForCurrentLocation = this.searchPropertyForCurrentLocation.bind(
      this
    );
    this.getFavourite = this.getFavourite.bind(this);
    this.deleteFavourite = this.deleteFavourite.bind(this);
  }

  componentDidMount() {
    var userlat, userlng;
    if (!(typeof this.props.location.state == "undefined")) {
      searchDetails = this.props.location.state.searchdetails;
      Geocode.fromLatLng(
        searchDetails.latattribute,
        searchDetails.lngattribute
      ).then(
        (response) => {
          this.setState(
            {
              markerPosition: {
                lat: searchDetails.latattribute,
                lng: searchDetails.lngattribute,
              },
              mapPosition: {
                lat: searchDetails.latattribute,
                lng: searchDetails.lngattribute,
              },
            },

            () => {
              this.searchPropertyForLocation();
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            userlat = position.coords.latitude;
            userlng = position.coords.longitude;
            this.setState(
              {
                markerPosition: {
                  lat: userlat,
                  lng: userlng,
                },
                mapPosition: {
                  lat: userlat,
                  lng: userlng,
                },
              },
              ()=>{
                this.searchPropertyForLocation();
              })
           },
           (error) => 
           this.searchPropertyForLocation(),
           { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        this.searchPropertyForLocation();
      }
    }
    this.getFavourite();
  }

  searchPropertyForCurrentLocation(latatr, lngatr) {
    axios
      .get(api + "allNearByProperties", {
        params: {
          lat: latatr,
          lng: lngatr,
        },
      })
      .then((response) => {
        const searchResult = response.data;
        this.setState({
          properties: searchResult,
          showSearchResult: true,
          activeSearchIndex: 0,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  searchPropertyForLocation() {
    axios
      .get(api + "allNearByProperties", {
        params: {
          lat: this.state.markerPosition.lat,
          lng: this.state.markerPosition.lng,
        },
      })
      .then((response) => {
        const searchResult = response.data;
        this.setState({
          properties: searchResult,
          showSearchResult: true,
          activeSearchIndex: 0,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  searchFilteredProperty(body) {
    axios
      .get(api + "filterallNearByProperties", {
        params: {
          propertyType:
            this.state.filter.propertyTypeFilter === "Property Type"
              ? ".*."
              : this.state.filter.propertyTypeFilter,
          bedroom: this.state.filter.bedroomFilter,
          bathroom: this.state.filter.bathroomFilter,
          minpriceRange: this.state.filter.priceValueFilter[0],
          maxpriceRange: this.state.filter.priceValueFilter[1],
          lat: this.state.markerPosition.lat,
          lng: this.state.markerPosition.lng,
        },
      })
      .then((response) => {
        const searchResult = response.data;
        this.setState({
          properties: searchResult,
          showSearchResult: true,
          activeSearchIndex: 0,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  filterProperties = (filterValues) => {
    this.setState(
      {
        filter: {
          propertyTypeFilter: filterValues.propertyTypeFilter,
          bedroomFilter: filterValues.bedroomFilter,
          bathroomFilter: filterValues.bathroomFilter,
          priceValueFilter: filterValues.priceValueFilter,
        },
      },
      () => {
        if (
          !(
            this.state.filter.propertyTypeFilter == "Apartment" &&
            this.state.filter.bedroomFilter == "Bedrooms" &&
            this.state.filter.bathroomFilter == "Bathrooms" &&
            this.state.filter.priceValueFilter == [0, 10000]
          )
        ) {
          this.searchFilteredProperty();
        }
      }
    );
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.place_,
      selectedLink: props.link,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng();
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        this.setState({
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
    this.searchPropertyForLocation();
  };

  onPlaceSelected = (place) => {
    const latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();
    // Set these values in the state.
    this.setState({
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
    this.searchPropertyForLocation();
  };

  // Get, Save and Delete Favourite

  getFavourite() {
    var auth = JSON.parse(localStorage.getItem("user"));
    if (auth) {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      };
      axios
        .get(favapi, requestOptions)
        .then((response) => {
          var searchResult = response.data;
          var items = [];

          for (const [index, value] of searchResult.entries()) {
            items.push(value.propertyID._id);
          }
          this.setState({
            favProperties: items,
          });
        })
        .catch((error) => {
          this.setState({ error: true });
        });
    }
  }

  saveFavourite = (propertydetail) => {
    var auth = JSON.parse(localStorage.getItem("user"));
    const property = {
      propertyID: propertydetail._id,
    };
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " +auth.token
        },
    };
    axios
      .post(favapi, property, requestOptions)
      .then((response) => {
        var searchResult = response.data;
        if (searchResult.message == "Added successfully") {
          this.getFavourite();
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  deleteFavourite = (propertydetail) => {
    var auth = JSON.parse(localStorage.getItem("user"));
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
      params: {
        property: propertydetail._id,
      },
    };
    axios
      .delete(favapi, requestOptions)
      .then((response) => {
        var searchResult = response.data;
        if (searchResult == "Deleted Successfully") {
          this.getFavourite();
          this.componentWillUpdate();
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };

  openModalHandler = (property) => {
    this.setState({
      isShowing: true,
      propertyDetails: property,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  };

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  scrollFunction() {
    var mybutton = document.getElementById("topBtn");
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.style.display = "block";
    } else {
      // mybutton.style.display = "none";
    }
  }

  onMapClick() {
    var mybutton = document.getElementById("topBtn");
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  takeToComponent(event, item) {
    var div = "#" + item.title;
    window.location.href = div;
  }

  render() {
    window.onscroll = this.scrollFunction;

    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={13.5}
          defaultCenter={{
            lat: this.state.markerPosition.lat,
            lng: this.state.markerPosition.lng,
          }}
        >
          {/* For Auto complete Search Box */}
          <Autocomplete
            style={{
              height: "55px",
              paddingLeft: "47px",
              color: "#995fc5",
              fontStyle: "italic",
              border: "none",
              margin: "6px",
              width: "-webkit-fill-available",
            }}
            placeholder="search with city or postal code"
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />

          {this.state.properties.map((item, index) => (
            <Marker
              google={this.props.google}
              key={index}
              draggable={true}
              onDragEnd={this.onMarkerDragEnd}
              position={{
                lat: item.geolocation.coordinates[0] + 0.001,
                lng: item.geolocation.coordinates[1],
              }}
              title={item.title}
              icon={{
                path:
                  "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z",
                scale: 0.05,
                size: "2px",
                strokeWeight: 0,
                scaledSize: 0.001,
                fillColor: "#995fc5",
                fillOpacity: 1,
              }}
              onClick={(event) => this.takeToComponent(event, item)}
            ></Marker>
          ))}

          <Marker
            google={this.props.google}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
            name={"Dolores park"}
          ></Marker>

          {/* InfoWindow on top of marker */}
        </GoogleMap>
      ))
    );
    let body;
    body = (
      <Fragment>
        <div className="catalogue-container">
          <Header />
          {this.state.isShowing && (
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              className="modal"
              propertyDetails={this.state.propertyDetails}
              show={this.state.isShowing}
              close={this.closeModalHandler}
              onHide={this.closeModalHandler}
            ></Modal>
          )}
          <div className="container">
            <div className="row">
              <div className="search-container">
                <AsyncMap
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTOah98FDMQHJVNk7oRe_kjKdZ_XYIUd4&libraries=places"
                  loadingElement={
                    <div
                      tyle={{
                        height: `100%`,
                        width: "100%",
                        position: "relative",
                      }}
                    />
                  }
                  containerElement={
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        position: "relative",
                      }}
                    />
                  }
                  mapElement={
                    <div
                      style={{
                        height: `85%`,
                        width: "100%",
                        position: "relative",
                      }}
                    />
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
                  <PropertyFilter
                    filter={this.state.filter}
                    onFilterClick={this.filterProperties.bind(this)}
                  />
                </div>
                {this.state.showSearchResult ? (
                  <div className="col-lg-9">
                    {this.state.properties.length > 0 ? (
                      <div>
                        <h4 className="property-title">Property</h4>
                        <div className="property-list">
                          {/* using the property filter component to display list of property in card view */}
                          {this.state.properties.map((item, index) => (
                            <PropertyCard
                              key={index}
                              id={index}
                              onPropertyClick={this.openModalHandler.bind(
                                this,
                                item
                              )}
                              onFavouriteClickAdd={this.saveFavourite.bind(
                                this,
                                item
                              )}
                              onFavouriteClickRemove={this.deleteFavourite.bind(
                                this,
                                item
                              )}
                              property={item}
                              favProperties={this.state.favProperties}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="property-title">
                          No Search Result Found
                        </h1>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    className="col-lg-9"
                    style={{
                      marginTop: "20px",
                      textAlign: "center",
                      color: "#995fc5",
                    }}
                  >
                    <>
                      <Spinner animation="border" size="lg" />
                      <Spinner animation="border" />
                      <Spinner animation="grow" size="xl" />
                      <Spinner animation="grow" />
                    </>
                    <h4>Loading...</h4>
                  </div>
                )}
              </div>
            </div>
            <button onClick={this.topFunction} id="topBtn" title="Go to top">
              <i className="fa fa-arrow-up" aria-hidden="true"></i>
              <p>To Top</p>
            </button>
          </section>

          <Footer />
        </div>
      </Fragment>
    );
    return body;
  }
}

export default PropertyCatalogue;