import React, { Fragment } from "react";
import "./propertydetails.css";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import BookingComponent from "../components/BookingComponent";

var propertyDetails;

Geocode.setApiKey("AIzaSyBTOah98FDMQHJVNk7oRe_kjKdZ_XYIUd4");
Geocode.enableDebug();
export var propertyId = "";

class PropertyDetails extends React.Component {
  constructor(props) {
    super(props);
    propertyDetails = this.props.propertyDetails;
    propertyId = this.props.propertyDetails._id;
  }

  componentDidMount() {
    Geocode.fromLatLng(
      propertyDetails.geolocation.coordinates[0],
      propertyDetails.geolocation.coordinates[1]
    ).then(
      (response) => {
        this.address = response.results[0].formatted_address;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  render() {
    const imagesNumber = propertyDetails.imageurl.length;

    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={14}
          defaultCenter={{
            lat: propertyDetails.geolocation.coordinates[0],
            lng: propertyDetails.geolocation.coordinates[1],
          }}
        >
          {/*Marker*/}
          <Marker
            google={this.props.google}
            draggable={true}
            position={{
              lat: propertyDetails.geolocation.coordinates[0],
              lng: propertyDetails.geolocation.coordinates[1],
            }}
          />
          <Marker />
          {/* InfoWindow on top of marker */}
          <InfoWindow
            position={{
              lat: propertyDetails.geolocation.coordinates[0] + 0.0018,
              lng: propertyDetails.geolocation.coordinates[1],
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {propertyDetails.location.streetname},{" "}
                {propertyDetails.location.city},{" "}
                {propertyDetails.location.province}{" "}
                {propertyDetails.location.postalcode}
              </span>
            </div>
          </InfoWindow>
        </GoogleMap>
      ))
    );
    console.log(propertyDetails);
    return (
      <Fragment>
        <section class="property-container">
          <div class="container">
            <div class="row">
              <div class="col-lg-8">
                <div class="property">
                  <div
                    id="image"
                    class="carousel slide carousel-fade "
                    data-ride="carousel"
                  >
                    {/* <!--Indicators--> */}
                    <ol class="carousel-indicators">
                      {propertyDetails.imageurl.map((item, index) => (
                        <li
                          data-target="#image"
                          data-slide-to={index}
                          class={index === 0 ? "active" : ""}
                        ></li>
                      ))}
                    </ol>
                    <div class="carousel-inner property-m-image">
                      {propertyDetails.imageurl.map((item, index) => (
                        <div
                          class={
                            index === 0
                              ? "carousel-item active"
                              : "carousel-item"
                          }
                          data-interval="3000"
                        >
                          <img
                            src={item}
                            style={{ height: "500px" }}
                            class="d-block w-100"
                            alt="..."
                          />
                        </div>
                      ))}
                    </div>
                    {imagesNumber > 1 && (
                      <Fragment>
                        <a
                          class="carousel-control-prev"
                          href="#image"
                          role="button"
                          data-slide="prev"
                        >
                          <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"
                          ></span>
                          <span class="sr-only">Previous</span>
                        </a>
                        <a
                          class="carousel-control-next"
                          href="#image"
                          role="button"
                          data-slide="next"
                        >
                          <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"
                          ></span>
                          <span class="sr-only">Next</span>
                        </a>
                      </Fragment>
                    )}
                  </div>

                  <div class="row">
                    <div class="col-lg-8">
                      <div class="property-header">
                        <h3 style={{ color: "#995fc5" }}>
                          {propertyDetails.title}
                        </h3>
                        <h5>
                          {propertyDetails.location.streetname},{" "}
                          {propertyDetails.location.city},{" "}
                          {propertyDetails.location.province}{" "}
                          {propertyDetails.location.postalcode}
                        </h5>
                      </div>
                    </div>
                    <div class="col-lg-4 text-left text-lg-right">
                      <div class="property-header">
                        <h3>$ {propertyDetails.price}</h3>
                        <p>
                          {propertyDetails.bedroom} Bedrooms{" "}
                          {propertyDetails.property_type}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="property-basicinfo">
                    <div class="row">
                      <div class="col-lg-12">
                        <div class="info-list">
                          <div class="info">
                            {" "}
                            <i class="fa fa-bed"></i>
                            {propertyDetails.bedroom} Bedroom{" "}
                          </div>
                          <div class="info">
                            {" "}
                            <i class="fa fa-bath"></i>
                            {propertyDetails.bathroom} Baths
                          </div>
                          <div class="info">
                            {" "}
                            <i class="fa fa-car"></i>
                            {propertyDetails.bedroom} Garage
                          </div>
                          <div class="info">
                            {" "}
                            <i class="fa fa-arrows-alt"></i>
                            {propertyDetails.property_size} SF
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="property-description">
                    <h4>Description</h4>
                    <p>{propertyDetails.description} </p>
                    <h4>Details and Rules</h4>
                    <p>{propertyDetails.rulesanddetails}</p>
                  </div>
                  <div class="property-features">
                    <div class="row">
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>House Type</h6>
                          <p>Villa/Resident</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>Stories</h6>
                          <p>32</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>Year Built</h6>
                          <p>2008</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>A/C</h6>
                          <p>Inclusive</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>Heating</h6>
                          <p>Inclusive</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>Bathrooms</h6>
                          <p>2</p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>Pool</h6>
                          <p>Yes</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>Fireplace</h6>
                          <p>No</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-3">
                        <div class="feature">
                          <h6>Parking Spaces</h6>
                          <p> 2 spaces</p>
                        </div>
                      </div>
                      <div class="col-6 col-sm-4 col-md-3 col-lg-2">
                        <div class="feature">
                          <h6>Parking Type</h6>
                          <p>Garage</p>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-lg-3">
                        <div class="feature">
                          <h6>Playgroung</h6>
                          <p>No</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-8 sidebar">
                <div class="owner-container">
                  <img src="img/agents/1.jpg" alt="" />
                  <div class="owner-text">
                    <h4>{propertyDetails.owner.username}</h4>
                    <h6>Property Owner</h6>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.{" "}
                    </p>
                    <a href="#" class="contactowner-btn">
                      Contact the Owner
                    </a>

                    <a href="#" class="makeappointment-btn">
                      <BookingComponent>Make an Appointment</BookingComponent>
                    </a>
                  </div>
                </div>
                <div class="map-view">
                  <AsyncMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBTOah98FDMQHJVNk7oRe_kjKdZ_XYIUd4&libraries=places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default PropertyDetails;
