import React, { Component } from 'react';
import { Fragment } from 'react';
import './propertycatalogue.css';
import Header from '../molecules/Header'
import Footer from '../molecules/footer';
import PropertyCard from './propertycard.jsx'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner'
import Modal from './ModalSetup';
import 'react-fontawesome'


//var api = process.env.REACT_APP_API_URL + "/favourite";
var api = "https://rently-services-group13.herokuapp.com/api/favourite";

class Favourite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSearchResult: false,
      activeSearchIndex: 0,
      properties: [],
      isShowing: false,
      favProperties :[]
    }

    this.getFavourite = this.getFavourite.bind(this);
    this.deleteFavourite = this.deleteFavourite.bind(this);
    

  }


  componentDidMount() {
    this.getFavourite()
  }



  getFavourite() {
    var auth = JSON.parse(localStorage.getItem('user'));
    
    if(auth)
    {
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            },
        };
        axios.get(api, requestOptions).then(response => {
            var searchResult = response.data;
            var items =[]
            
            for (const [index, value] of searchResult.entries()) {
                items.push(value.propertyID._id)
            }
            this.setState(
                { 
                    properties: searchResult, 
                    showSearchResult: true, 
                    activeSearchIndex: 0 ,
                    favProperties : items
                }
            )
          }).catch(error => {
            this.setState({ error: true })
          })
    }
  };


  deleteFavourite = (propertydetail) => {
    var auth = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + auth.token
        },
        params: {
            property: propertydetail._id
        }
    };
    axios.delete(api, requestOptions).then(response => {
        var searchResult = response.data;
        if(searchResult==="Deleted Successfully")
        {
            this.getFavourite();
        }
      }).catch(error => {
        this.setState({ error: true })
      })
  }


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

  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  scrollFunction() {
    var mybutton = document.getElementById("topBtn");
    if(mybutton != null)
    {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        mybutton.style.display = "block";
        } else {
        mybutton.style.display = "none";
        }
    }
  }

  takeToComponent(event, item) {
    var div = '#' + item.title;
    window.location.href = div;
  }

  render() {

    window.onscroll = this.scrollFunction;

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
              <div className="search-container-fav">
                    <h1 style={{textAlign:"center"}}>Favourite properties</h1>
              </div>
            </div>
          </div>
          
          <section className="cards">
            <div className="container">
              <div className="row">
              {localStorage.getItem('user')?
                (
                <Fragment>
                {this.state.showSearchResult ?

                  <div className="col-lg-12">
                    {this.state.properties.length > 0 ?
                      <div>
                        
                        <div className="property-list">
                          {/* using the property filter component to display list of property in card view */}
                          {this.state.properties.map((item, index) =>
                           
                            <PropertyCard key={index} id={index}
                              onPropertyClick={this.openModalHandler.bind(this, item.propertyID)}
                              onFavouriteClickRemove ={this.deleteFavourite.bind(this,item.propertyID)}
                              property={item.propertyID}
                              favProperties ={this.state.favProperties} />

                          )}
                        </div>
                      </div>
                      :
                      <div>
                        <h1 className="property-title">No Properties added in Favourite</h1>
                      </div>
                    }

                  </div>
                  :
                  <div className="col-lg-9" style={{ marginTop: '20px', textAlign: "center", color: '#995fc5' }}>
                    <>
                      <Spinner animation="border" size="lg" />
                      <Spinner animation="border" />
                      <Spinner animation="grow" size="xl" />
                      <Spinner animation="grow" />
                    </>
                    <h4>Loading...</h4>
                  </div>

                }
                </Fragment>
                ):(
                    <div class ="col-lg-12 " >
                        <div class ="loginrequired"></div>
                        <h1 className="property-title">Please Login to view your favourite</h1>
                    </div>
                )
                }
              </div>
            </div>
            <button onClick={this.topFunction} id="topBtn" title="Go to top"><i className="fa fa-arrow-up" aria-hidden="true"></i><p>To Top</p></button>
          </section>

          <Footer />
        </div>
      </Fragment>
    return (body);
  }
};

export default Favourite;