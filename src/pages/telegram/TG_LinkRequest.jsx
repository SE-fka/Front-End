import React, { useState, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';
import { Card, Grid, Box, TextField } from "@mui/material";
import API from '../../API/TelegramApi';
import { useTheme } from "@emotion/react";
import { tokens } from "../../styles/theme";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const url = API.LinkRequest()

const TG_LinkRequest = () => {
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


  const [channel, setChannel] = useState('');
  const [group, setGroup] = useState('');
  const [channeldata, setChannelData] = useState({ columns: [], rows: [] }); 
  const [groupdata, setGroupData] = useState({ columns: [], rows: [] }); 
 
  useEffect(() => {
    getData();
   // eslint-disable-next-line
  }, []);

  const getData = async () =>{
    try {
      await API.getLinkRequest()
        .then(response => {
     const channel = response.data.channel_username;
     const columns = [
       {
       label: '#',
       field: 'index',
       sort: 'asc'
       },
       {
        label: "channel Username",
        field: "username",
        sort: "disabled",
        maxWidth: 100,
        width: 100,
       },
       {
         label: 'Actions',
         field: 'action',
         width: 100
      }
     ];
     const rows = channel.map((channel, index) => ({
       index: index + 1,
       username: channel.username,
       action:  <div style={{ display: "flex"}}>
       <div
         className="uil-trash-alt"
         style={Viewstyle}>
        <a href={"https://t.me/" + channel.username}  target="_blank" rel="noopener noreferrer" style={astyle}>View</a> 
       </div>
       &nbsp;&nbsp;&nbsp;
       <div
         className="uil-trash-alt"
         style={Deletestyle}
         onClick={() => { if (window.confirm('❌ Are you sure you wish to delete this channel?')) deleteChannel(channel.username)} } 
         >
         Delete
       </div> 
       </div>
     }));
     setChannelData({ columns, rows });
   })
   }
  catch (err) {  
   } 
   
   try {
    await API.getGroupLinkRequest()
      .then(response => {
   const group = response.data.group_username;
   const columns = [
     {
     label: '#',
     field: 'index',
     sort: 'asc'
     },
     {
       label: "Group Username",
       field: "username",
       sort: "disabled",
       maxWidth: 100,
       width: 100,
     },
     {
       label: 'Actions',
       field: 'action',
       width: 100
    }
   ];
   const rows = group.map((group, index) => ({
     index: index + 1,
     username: group.username,
     action:  <div style={{ display: "flex"}}>
     <div
       className="uil-trash-alt"
       style={Viewstyle}>
      <a href={"https://t.me/" + group.username}  target="_blank" rel="noopener noreferrer" style={astyle}>View</a> 
     </div>
     &nbsp;&nbsp;&nbsp;
     <div
       className="uil-trash-alt"
       style={Deletestyle}
      onClick={() => { if (window.confirm('❌ Are you sure you wish to delete this group?')) deleteGroup(group.username)} } 
     >
       Delete
     </div> 
     </div>
   }));
   setGroupData({ columns, rows });
 })
 }
catch (err) {  
 } 

  }
  
const addChannel = async (e) => {
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append('x-access-token', user.accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", channel);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };
    
    fetch(url + "channel/add", requestOptions)
    .then(response => response.json())
    .then((result) => {
      if (result.type === 'success') {
        toast.success(result.message);
         getData();
      } else if (result.type === 'warning') {
        window.confirm('❎ Channel already exist!')
        getData();
      } else if (result.type === 'error') {
        toast.error(result.message);
      }
    });   
  setChannel('')           
  }

const deleteChannel = async () =>{
var myHeaders = new Headers();
myHeaders.append('x-access-token', user.accessToken);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

var urlencoded = new URLSearchParams();
urlencoded.append("username", channel.username);
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: urlencoded,
redirect: 'follow'
};

fetch(url + "channel/delete", requestOptions)
.then(response => response.json())
.then((result) => {
  if (result) {
    toast.success(result.message);
    getData();
  }
})
.catch(error => console.log('error', error))    
}

const addGroup= async (e) => {
  e.preventDefault()
  var myHeaders = new Headers();
  myHeaders.append('x-access-token', user.accessToken);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", group);
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  
  fetch(url + "group/add", requestOptions)
  .then(response => response.json())
  .then((result) => {
    if (result.type === 'success') {
      toast.success(result.message);
      getData();
    } else if (result.type === 'warning') {
      window.confirm('❎ Group already exist!')
      getData();
    } else if (result.type === 'error') {
      toast.error(result.message);
    }
  });  
setGroup('')         
}

const deleteGroup = async (group) =>{
var myHeaders = new Headers();
myHeaders.append('x-access-token', user.accessToken);
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
var urlencoded = new URLSearchParams();
urlencoded.append("username", group);
var requestOptions = {
method: 'POST',
headers: myHeaders,
body: urlencoded,
redirect: 'follow'
};

fetch(url + "group/delete", requestOptions)
.then(response => response.json())
.then((result) => {
  if (result) {
    toast.success(result.message);
    getData();
  }
})
.catch(error => console.log('error', error))    
}

  return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-8"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/telegram.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Channel Sraping Requests</h4>
   </Card>
    <Grid align='center'>
    <form onSubmit={addChannel}>
      <TextField  label="Add Link" style = {{width: '60%'}} required 
      value={channel}
      onChange={e => setChannel(e.target.value)}/>
      &nbsp;&nbsp;<button type='submit' variant="primary" style={btnstyle}>Add</button>
      </form>
      </Grid>
    </div>
    </div>
    <div className="row" style={divstyle}>
    <div className="col-sm-8">  
    <MDBDataTable
       style={{backgroundColor:'white', fontSize:'16px'}}
        noBottomColumns={true}
          striped
          bordered
          large
        data={channeldata} 
        />
  </div>
  </div>
  <br />
  <div className="row" style={divstyle}>
    <div className="col-sm-8"> 
    <Card style={cardstyle}>
    <img alt="fb" src={'../../image/telegram_group.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Group Sraping Requests</h4>
   </Card>
    <Grid align='center'>
    <form onSubmit={addGroup}>
      <TextField  label="Add Link" style = {{width: '60%'}} required 
      value={group} onChange={e => setGroup(e.target.value)}/>
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
         data={groupdata}  
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
  )
}

export default TG_LinkRequest