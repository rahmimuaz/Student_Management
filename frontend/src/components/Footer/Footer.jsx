import React from 'react';
import './Footer.css';
import logo from '../../assets/logo_footer.png'; // Adjust the path if necessary
import facebookIcon from '../../assets/facebook_icon.png';
import twitterIcon from '../../assets/twitter_icon.png';
import linkedinIcon from '../../assets/linkedin_icon.png';

const Footer = () => {
    return (
        
        <div className="footer"> 
            <hr />
            <div className="footer-container">
                <div className="ifooter-section description">
                    <img src={logo} alt="Company Logo" className="footer-logo" />
                    <p>Your trusted destination for quality building materials, tools, and gardening supplies. Established in 2012, </p>
                    
                    {/* Social Media Icons Section */}
                    <div className="social-media-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <img src={facebookIcon} alt="Facebook" className="social-icon" />
                        </a>
                        <a href="https://www.whatsapp.com/" target="_blank" rel="noopener noreferrer">
                            <img src={twitterIcon} alt="Twitter" className="social-icon" />
                        </a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
                        </a>
                    </div>
                </div>
                <div className="ifooter-section links">
                    <h6>Company</h6>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="ifooter-section contact">
                    <h6>Contact Us</h6>
                    <p>433/1, Kandy Road, Mawanella. </p>
                    <p>Email: evolexxlk@gmail.com</p>
                    <p>Phone: +94 75 603 1924</p>
                </div>
            </div>
            <div className="ifooter-bottom" style={{ textAlign: 'center', padding: '10px 0', backgroundColor: '#fafafc', color: 'white' }}>
                <p>&copy; {new Date().getFullYear()} Evolexx.lk  All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;
