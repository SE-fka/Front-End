import React, {useEffect, useState} from 'react'
import { MDBDataTable } from 'mdbreact';
import API from '../../API/TwitterApi';
import {TextField, Grid, Box, Card, useTheme} from "@mui/material";
import { tokens } from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = API.LinkRequest()

const TW_LinkRequest = () => {
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

    const [username, setUsername] = useState('');
    const [linkRequest, setLinkRequest] = useState([]);
    
      useEffect(() => {
        getLinkRequest();
    }, []);

 const getLinkRequest = async () =>{
        try {
          await API.getLinkRequest()
          .then(response => setLinkRequest(response.data)); 
          
        }
        catch (error) {
            console.log('Error', error)
        }     
      }
 
  const addLinkRequest = async (e) => {
        e.preventDefault()
        var myHeaders = new Headers();
        myHeaders.append('x-access-token', user.accessToken);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", username);
        urlencoded.append("type", "username");
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };
        
        fetch(url + "add", requestOptions)
        .then(response => response.json())
        .then((result) => {
          if (result.type === 'success') {
            toast.success(result.message);
            getLinkRequest();
          } else if (result.type === 'warning') {
            window.confirm('❎ Username Already exist!')
            getLinkRequest();
          } else if (result.type === 'error') {
            toast.error(result.message);
          }
        }); 
      setUsername('')             
      }
   
 const deleteLink = async (username) =>{
  var myHeaders = new Headers();
  myHeaders.append('x-access-token', user.accessToken);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", username);
  urlencoded.append("type", "username");
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch(url + "delete", requestOptions)
  .then(response => response.json())
  .then((result) => {
    if (result) {
      toast.success(result.message);
      getLinkRequest();
    }
  })
  .catch(error => console.log('error', error))    
}

  const tw_links = linkRequest.map((username, index) => {
        return  {
          id: index+1,
          username:username,
          action:  
          <div style={{ display: "flex"}}>
          <div
            className="uil-trash-alt"
            style={Viewstyle}>
           <a href={"https://twitter.com/" + username}  target="_blank" rel="noopener noreferrer" style={astyle}>View</a> 
          </div>
          &nbsp;&nbsp;&nbsp;
          <div
            className="uil-trash-alt"
            style={Deletestyle}
            onClick={() => { if (window.confirm('❌ Are you sure you wish to delete this username?')) deleteLink(username)} }
          >
            Delete
          </div> 
          </div>
         }
        });


      const twitterLink = {
        columns: [
            {
                label: '#',
                field: 'id',
             },
            {
                label: 'Twitter Link or Username',
                field: 'username',
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
            tw_links
      };
 
    return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-8"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/twitter.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Twitter Sraping Requests</h4>
   </Card>
    <Grid align='center'>
    <form onSubmit={addLinkRequest}>
      <TextField  label="Add Link" style = {{width: '60%'}} required 
      value={username}
      onChange={e => setUsername(e.target.value)}/>
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
          data={twitterLink} 
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
    
export default TW_LinkRequest