import React, {useEffect, useState} from 'react'
import { MDBDataTable } from 'mdbreact';
import API from '../../API/FacebookApi';
import {TextField, Grid, Card, Box, useTheme} from "@mui/material";
import { tokens } from "../../styles/theme";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const url = API.LinkRequest()

const FB_LinkRequest = () => {
    const user = JSON.parse(localStorage.getItem('token'));
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const btnstyle={height: '52px', width: '10%', border:'0px', backgroundColor: colors.blueAccent[400]}
    const divstyle={display: 'flex', justifyContent: 'center'}
    const cardstyle={display: 'flex', margin: '3%', justifyContent: 'center'}
    const imagestyle={height: '20px',width: '20px',opacity: .8} 
    const astyle={textDecoration: 'none',  color: "white"}
    const Viewstyle={cursor: "pointer", color: "white", padding: ".5rem", borderRadius: ".3rem", background: "#7393B3"}
    const Deletestyle={cursor: "pointer", color: "white", padding: ".5rem", borderRadius: ".3rem", background: "#fb6262"}

    const [userlink, setLink] = useState('');
    const [pagelink, setpageLink] = useState("");
    const [linkRequest, setLinkRequest] = useState([]);
    const [pagelinkRequest, setpageLinkRequest] = useState([]);

      useEffect(() => {
        getLinkRequest();
        getPageLinkRequest();
    }, []);


const addLinkRequest = async (e) => {
  e.preventDefault()
  var myHeaders = new Headers();
  myHeaders.append('x-access-token', user.accessToken);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("link", userlink);
  urlencoded.append("type", "link");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch(url + "user/add", requestOptions)
  .then(response => response.json())
  .then((result) => {
    if (result.type === 'success') {
      toast.success(result.message);
      getLinkRequest();
    } else if (result.type === 'warning') {
      window.confirm('❎ Link Already exist!')
      getLinkRequest();
    } else if (result.type === 'error') {
      toast.error(result.message);
    }
  });    
  setLink('')  
}

const addPageLinkRequest = async (e) => {
  e.preventDefault()
  var myHeaders = new Headers();
  myHeaders.append('x-access-token', user.accessToken);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("link", pagelink);
  urlencoded.append("type", "link");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch(url + "page/add", requestOptions)
  .then(response => response.json())
  .then((result) => {
    if (result.type === 'success') {
      toast.success(result.message);
      getPageLinkRequest();
    } else if (result.type === 'warning') {
      window.confirm('❎ Link Already exist!')
      getPageLinkRequest();
    } else if (result.type === 'error') {
      toast.error(result.message);
    }
  });   
  setpageLink('')         
}

const getLinkRequest = async () =>{
        try {
          await API.getLinkRequest()
          .then(response => setLinkRequest(response.data)); 
          
        }
        catch (error) {
            console.log('Error', error)
        }     
      }
 
const getPageLinkRequest = async () =>{
        try {
          await API.getPageLinkRequest()
          .then(response => setpageLinkRequest(response.data)); 
          
        }
        catch (error) {
            console.log('Error', error)
        }     
      }
const deleteLink = async (userlink) =>{
    var myHeaders = new Headers();
    myHeaders.append('x-access-token', user.accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("link", userlink);
    urlencoded.append("type", "link");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch(url + "user/delete", requestOptions)
    .then(response => response.json())
    .then((result) => {
      if (result) {
        toast.success(result.message);
        getLinkRequest();
      }
    })
    .catch(error => console.log('error', error))     
  }

 const deletePageLink = async (pagelink) =>{
      var myHeaders = new Headers();
      myHeaders.append('x-access-token', user.accessToken);
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      
      var urlencoded = new URLSearchParams();
      urlencoded.append("link", pagelink);
      urlencoded.append("type", "link");
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      
      fetch(url + "page/delete", requestOptions)
      .then(response => response.json())
      .then((result) => {
        if (result) {
          toast.success(result.message);
          getPageLinkRequest();
        }
      })
      .catch(error => console.log('error', error)) 
     }

    const fb_links = linkRequest.map((userlink, index) => {
        return  {
          id: index+1,
          link:userlink,
          action:  
          <div style={{ display: "flex"}}>
          <div
            className="uil-trash-alt"
            style={Viewstyle}>
           <a href={"https://facebook.com/" + userlink}  target="_blank" rel="noopener noreferrer" style={astyle}>View</a> 
          </div>
          &nbsp;&nbsp;&nbsp;
          <div
            className="uil-trash-alt"
            style={Deletestyle}
            onClick={() => { if (window.confirm('❌ Are you sure you wish to delete this Link?')) deleteLink(userlink)}}
          >
            Delete
          </div> 
          </div>
         }
        });

    const fb_page_links = pagelinkRequest.map((pagelink, index) => {
      return  {
        id: index+1,
        link:pagelink,
        action: 
        <div style={{ display: "flex"}}>
        <div className="uil-trash-alt"
          style={Viewstyle}>
          <a href={"https://facebook.com/" + pagelink}  target="_blank" rel="noopener noreferrer" style={astyle}>View</a> 
        </div >
        &nbsp;&nbsp;&nbsp;
        <div
            className="uil-trash-alt"
            style={Deletestyle}
            onClick={() => { if (window.confirm('❌ Are you sure you wish to delete this Link?')) deletePageLink(pagelink)}}
          >
            Delete
          </div> 
        </div>
   }
      });

      const userLink = {
        columns: [
            {
                label: '#',
                field: 'id',
             },
            {
                label: 'Facebook Link',
                field: 'link',
                sort: 'asc',
                width: 150
             },
             {
                 label: 'Actions',
                 field: 'action',
                 width: 150
              }
        ],
        rows: 
            fb_links
      };
 

      const pageLink = {
        columns: [
            {
                label: '#',
                field: 'id',
             },
            {
                label: 'Facebook Link',
                field: 'link',
                sort: 'asc',
                width: 150
             },
             {
                 label: 'Actions',
                 field: 'action',
                 width: 150
              }
        ],
        rows: 
            fb_page_links
      };


    return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-8"> 
    <Card style={cardstyle}>
    <img alt="fb" src={'../../image/facebook.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> User Account Sraping Requests</h4>
   </Card>
    <Grid align='center'>
    <form onSubmit={addLinkRequest}>
      <TextField  label="Add Link" style = {{width: '60%'}} required 
      value={userlink} onChange={e => setLink(e.target.value)}/>
      &nbsp;&nbsp;<button type='submit' variant="primary" style={btnstyle}>Add</button>
      </form>
      </Grid>
    </div>
    </div>
    <br />
    <div className="row" style={{display: 'flex', justifyContent: 'center'}}>
    <div className="col-sm-8">  
    <MDBDataTable
         style={{backgroundColor:'white', fontSize:'16px'}}
         noBottomColumns={true}
          striped
          bordered
          small
          data={userLink} 
        />
  </div>
  </div>
 <br />

<div className="row" style={divstyle}>
    <div className="col-sm-8"> 
    <Card style={cardstyle}>
    <img alt="fb" src={'../../image/facebook_group.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Page Sraping Requests</h4>
   </Card>
    <Grid align='center'>
    <form onSubmit={addPageLinkRequest}>
      <TextField  label="Add Link" style = {{width: '60%'}} required 
      value={pagelink} onChange={e => setpageLink(e.target.value)}/>
      &nbsp;&nbsp;<button type='submit' variant="primary" style={btnstyle}>Add</button>
      </form>
      </Grid>
    </div>
    </div>
    <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-8">  
    <MDBDataTable
       style={{backgroundColor:'white', fontSize:'16px'}}
        noBottomColumns={true}
          striped
          bordered
          small
          data={pageLink} 
        />
  </div>
  </div>
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
     pauseOnHover
     theme="light" />
    <ToastContainer />
  </div>
  </Box>
   );
  }
    
export default FB_LinkRequest