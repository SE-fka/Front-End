import React from 'react';
import {Typography } from '@mui/material';


const NotFound =() =>{
  return (
    <div className="container-fluid">
    <br />
      <br />
      <div className="row" style={{display: 'flex', marginTop: '5%', justifyContent: 'center'}}>
     <div className="col-sm-6">  
   
      <Typography variant="h1" style={{ color: 'red' }}>
        404
      </Typography>
      <Typography variant="h4">
      The page you’re looking for doesn’t exist. 
      </Typography>

       </div>
      </div>
      </div>
  );
}
export default NotFound