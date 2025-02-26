import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className='footer-links'>
                <div className='contact'>
                    <p><b>Contact</b></p>
                    <br />
                    <p>andreu.hernanz@gmail.com</p>
                    <p>+34 634434111</p>
                </div>
                <div>
                    <p><b>Socials</b></p>
                    <br />
                    <p>Instagram: <a href="https://www.instagram.com/andreu_hernanz/" target="_blank" rel="noopener noreferrer">andreu_hernanz </a> </p>
                    <p>Facebook</p>
                    <p>Twitter: <a href="https://x.com/4W_4ndreW" target="_blank" rel="noopener noreferrer">https://x.com/4W_4ndreW</a></p>
                </div>
                <div>
                    <p><b>Legal</b></p>
                    <br />
                    <p>Terms & Conditions</p>
                    <p>Privacy Policy</p>
                </div>
            </div>
            <hr />
            <p className='copyright'>© Mr Shake's Shop 2025. All rights reserved.</p>
        </footer>
    );
};

export default Footer;