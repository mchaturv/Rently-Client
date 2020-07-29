import React, { Fragment } from 'react'
import '../Property/propertycard.css';


class PropertyCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>

                <div className="property-card" id={this.props.property.title} onClick={this.props.onPropertyClick}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="property-pic">
                                <img src={this.props.property.imageurl[0]} alt="" />
                            </div>
                        </div>
                        <div className="col-md-8 property-content">
                            <div className="property-text">
                                <h5 className="property-title"><a onClick={this.props.onPropertyClick}>{this.props.property.title}</a></h5>
                                <span className="fa fa-heart favourite"></span>
                                <div className="property-price">
                                    <i className="fas fa-dollar-sign"></i><h5>{this.props.property.price} / month</h5>
                                </div>

                                <ul className="property-type">
                                    <li>
                                        <i className="fa fa-arrows-alt"></i>
                                        <p>{this.props.property.property_size} sqft</p>
                                    </li>
                                    <li>
                                        <i className="fa fa-bed"></i>
                                        <p>{this.props.property.bedroom} Bedroom</p>
                                    </li>
                                    <li>
                                        <i className="fa fa-bath"></i>
                                        <p>{this.props.property.bathroom} Bathroom</p>
                                    </li>
                                </ul>

                                <div className="property-location"><i className="fa fa-map-marker-alt"></i>{this.props.property.location.streetname}, {this.props.property.location.city}, {this.props.property.location.province}</div>
                                <p className="block-with-text">{this.props.property.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default PropertyCard;