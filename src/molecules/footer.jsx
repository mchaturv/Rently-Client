import React, {Fragment} from 'react'
import './footer.css';

class Footer extends React.Component {
        render() {
    return (
      <Fragment>

        <footer className="footer-section">
            <div className="container">
                <div className="footer-text">
                    <div className="row">
                        <div className="col-lg-4 pl-4 mr-4">
                            <div className="footer-logo">
                                <div className="logo">
                                    <a href="#"><h3 >Rently</h3></a>
                                </div>
                                <p>Subscribe our newsletter to get notification about new updates.</p>
                                <form action="#" className="newslatter-form">
                                    <input type="text" placeholder="Enter your email..."/>
                                    <button type="submit"><i className="fa fa-location-arrow"></i></button>
                                </form>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 pl-4 ml-4">
                            <div className="footer-widget">
                                <h4>Social</h4>
                                <ul className="social">
                                    <li>
                                         <i className="fab fa-facebook" size="3x" 
                                        spin="true" style={{ textShadow: 'rgba(71, 60, 133, 0.98) 0px 0px 1px'},{color:'#3973E8' }}/>
                                        <a href="#">Facebook</a>
                                    </li>
                                    
                                    <li>
                                        <i className="fab fa-instagram" size="3x" 
                                        spin="true" style={{ textShadow: 'rgba(71, 60, 133, 0.98) 0px 0px 1px'},{color:'#F74D91' }}/>
                                        <a href="#">Instagram</a>
                                    </li>
                                    <li>
                                        <i className="fab fa-twitter" name="facebook" size="3x" 
                                        spin="true" style={{ textShadow: 'rgba(71, 60, 133, 0.98) 0px 0px 1px'},{color:'#29BFE8' }}/>
                                        <a href="#">Twitter</a>
                                    </li>
                                    <li>
                                        <i className="fab fa-tumblr" name="facebook" size="3x" 
                                        spin="true" style={{ textShadow: 'rgba(71, 60, 133, 0.98) 0px 0px 1px'},{color:'white' }}/>
                                        <a href="#">Tumblr</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 pl-4">
                            <div className="footer-widget">
                                <h4>Contact Us</h4>
                                <ul className="general">
                                <li><i className="fa fa-map-marker-alt" size="3x"
                                style={{color:'Red' }}></i> 2309, Brunswick Street, B3K2Z1</li>
                                <li><i className="fa fa-phone" size="3x" style={{color:'green' }}></i> (1) 902 412 5851</li>
                                <li><i className="fa fa-envelope" size="3x" style={{color:'blue' }}></i> Rently@gmail.com</li>
                                <li><i className="fa fa-clock" size="3x" style={{color:'pink' }}></i> Mon - Sat, 08 AM - 05 PM</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </footer>           
    </Fragment>
    );
    }
}

export default Footer;
