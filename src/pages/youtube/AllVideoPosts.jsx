import React, { useState, useEffect } from "react";
import { MDBDataTable } from 'mdbreact';
import {Box, Card } from "@mui/material";
import API from '../../API/YouTubeApi';


const AllVideoPosts = () => {
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '3%', justifyContent: 'center'}
  const imagestyle={height: '20px',width: '20px', opacity: .8} 

  const [data, setData] = useState({ columns: [], rows: [] }); 

  const getVideos =async() => {
    try {
    await API.getChannel().then(response => {
        const videos = response.data;
        const columns = [
          {
          label: '#',
          field: 'index',
          sort: 'asc'
          },
          {
            label: "Video URL",
            field: "URL",
            sort: "asc",
            width: 50,
             },
          {
          label: "Video Title",
          field: "Title",
          sort: "asc",
          width: 50,
          },
        {
          label: "Likes",
          field: "Likes",
          sort: "asc",
          width: 50,
        },
        {
          label: "Shares",
          field: "Shares",
          sort: "asc",
          width: 50,
        },
        {
          label: "Action",
          field: "ViewVideo",
        },
        ];
        
        const rows = videos.map((video, index) => ({
          index: index + 1,
          URL: <a href={videos[0]['Video URL']}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
             {videos[0]['Video URL']} </a>,
          Title: videos[0]['Video Title'],
          Likes: videos[0]['Likes'], 
          Shares: videos[0]['Shares'],
          ViewVideo: <a href={videos[0]['Video URL']}  target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
         View Video </a>,
        }));
        setData({ columns, rows });
      })
    }
    catch (err) {
    } 
  }
  
  useEffect(() => {
    getVideos()
  }, []);


  return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/youtube.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> All Viedo Posts</h4>
   </Card>
 
    </div>
    </div>
    <div className="row" style={divstyle}>
    <div className="col-sm-11">  
    <MDBDataTable
       style={{backgroundColor:'white', fontSize:'16px'}}
        noBottomColumns={true}
          striped
          bordered
          lagrge
          data={data} 
        />
  </div>
  </div>
  </div>
  </Box>
  )
}

export default AllVideoPosts