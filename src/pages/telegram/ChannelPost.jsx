import React, { useState, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';
import {Box, Card } from "@mui/material";
import axios from "axios";
import authHeader from '../../API/AuthHeader';
import API from '../../API/TelegramApi';

const url = API.getChannelPost();

const ChannelPost = () => {
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '3%', justifyContent: 'center'}
  const imagestyle={height: '20px',width: '20px', opacity: .8} 

  const [data, setData] = useState({ columns: [], rows: [] }); 

  const query = new URLSearchParams(window.location.search);
  const doc_id = query.get('doc-id')

  const getPosts = async () =>{
     try {
      axios.get(url + `telegram-posts/channel/${doc_id}`, { headers: authHeader() })
         .then(response => {
      const posts = response.data.data;
      const columns = [
        {
        label: '#',
        field: 'index',
        sort: 'asc'
        },
        {
          label: "Message Content",
          field: "Message",
          sort: "disabled",
          maxWidth: 100,
          width: 100,
        },
        {
          label: "Time",
          field: "Time",
          sort: "asc",
          width: 50,
        },
      ];
      
      const rows = posts.map((message, index) => ({
        index: index + 1,
        Message: message.Message,
        Time:  new Date(message.Time).toDateString() + new Date(message.Time).toLocaleTimeString(),

      }));
      setData({ columns, rows });
    })
    }
   catch (err) {  
    }   
}

  useEffect(() => {
      getPosts();
   // eslint-disable-next-line
  }, []);


  return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/telegram.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Channel Posts</h4>
   </Card>
 
    </div>
    </div>
    <div className="row" style={divstyle}>
    <div className="col-sm-10">  
    <MDBDataTable
       style={{backgroundColor:'white', fontSize:'16px'}}
        noBottomColumns={true}
          striped
          bordered
          small
          data={data} 
        />
  </div>
  </div>
  <br />
  </div>
  </Box>
  )
}
export default ChannelPost