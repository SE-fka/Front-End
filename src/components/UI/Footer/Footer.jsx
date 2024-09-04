import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <main>
        {/* Your main content goes here */}
      </main>
      <footer>
        <div className='container text-light pt-5'>
          <div className='row'>
            <div className='col-sm-6 col-md-6 col-lg-4 mb-5'>
              <div className='footer-title'>
                <h6>About OSINT</h6>
              </div>
              <div className='footer-content'>
                <p>
                  <i>
                  <small style={{fontSize:'16px'}}>
                  Open-Source Intelligence (OSINT) is an intelligence produced by collecting, 
                  evaluating and analyzing publicly available information.
                  Data presentation tool for scraped content from social media and news sites.
                  </small>
                  </i>
                </p>
              </div>
            </div>
            <div className='col-sm-6 col-md-6 col-lg-2 mb-5'>
              <div className='footer-title'>
                <h6>Quick Links</h6>
              </div>
              <div className='footer-content'>
                <ul className='list-group quick-links'>
                 <li>
                    Home
                 </li>
                 <li> 
                    Live Search
                 </li>
                 <li> 
                    Scraper Tool
                 </li>
                 <li> 
                    Link Analysis
                 </li>
                 <li> 
                    Keyword Search
                 </li>
                 <li> 
                    Sentiment Analysis
                 </li>
                </ul>
              </div>
            </div>
            <div className='col-sm-6 col-md-6 col-lg-3 mb-5'>
              <div className='footer-title'>
                <h6>Contact Us</h6>
              </div>
              <div className='footer-content'>
                <p>
                  <i className='fas fa-map-marker-alt mr-2' />
                    &nbsp;&nbsp; Addis Ababa, Ethiopia
                </p>
                <p>
                 <i className='fas fa-globe mr-2' /> 
                  &nbsp;&nbsp; 
                  <a href="https://www.insa.gov.et" target="_blank" without rel="noreferrer"> https://www.insa.gov.et</a> 
                 </p>
                 <p>
                  <i className='fas fa-envelope mr-2' />
                  &nbsp;&nbsp; contact@insa.gov.et 
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom-footer pt-3 pb-3 text-center'>
          <small>Copyright © {currentYear} Information Network Security Administration (INSA)- All rights reserved.</small> 
        </div>
      </footer>
    </>
  );
};

export default Footer;