import React from 'react';

const TopBar = () => {
  return (
    <div className='top-bar pt-1 pb-1 text-light'>
      <div className='container'>
        <div className='d-flex justify-content-between'>
          <div className='d-flex pt-2 pb-2'>
            <div className='d-flex align-items-center mr-3'>
              <i className='fas fa-phone-alt mr-2' />
              &nbsp;&nbsp;
              +251 113 71 71 14
            </div>
            <div className='d-flex align-items-center mr-3' style={{paddingLeft:'10px'}}>
              <i className='fas fa-envelope mr-2' />
              &nbsp;&nbsp;
               contact@insa.gov.et 
            </div>
          <div className='d-flex align-items-center' style={{paddingLeft:'10px'}}>
            &nbsp;&nbsp;
              <i className='fas fa-fax mr-2' />
              &nbsp;&nbsp;
                 124498
            </div>
          </div>
          <div className='d-flex pt-2 pb-2'>
            <div className='social-media d-flex align-items-center'>
              <a href="https://www.facebook.com/INSA.ETHIOPIA" target="_blank" rel="noopener noreferrer" className='text-light mr-4'>
                <i className='fab fa-facebook-f' />
              </a>
              <a href="https://www.twitter.com/INSA.ETHIOPIA" target="_blank" rel="noopener noreferrer" className='text-light mr-4' style={{paddingLeft:'10px'}}>
                <i className='fab fa-twitter' />
              </a>
              <a href="https://www.linkedin.com/INSA.ETHIOPIA" target="_blank" rel="noopener noreferrer" className='text-light' style={{paddingLeft:'10px'}}>
                <i className='fab fa-linkedin-in' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
