import React, { useState, useEffect } from "react";
import API from '../../API/FacebookApi';
import { MDBDataTable } from 'mdbreact';
import {Box, Card } from "@mui/material";

const FacebookPost = () => {
    const divstyle={display: 'flex', justifyContent: 'center'}
    const cardstyle={display: 'flex', margin: '3%', justifyContent: 'center'}
    const imagestyle={height: '20px',width: '20px', opacity: .8} 
   
    const [profilepost, setProfilePost] = useState({ columns: [], rows: [] }); 
    const [pagepost, setPagePost] = useState({ columns: [], rows: [] }); 

    const getProfilePost = async () => {
        try {
          await API.getProfilePosts().then(response => {
              const profilepost = response.data;
              const columns = [
                {
                  label: '#',
                  field: 'index',
                  sort: 'asc'
                },
                {
                  label: 'Post Image',
                  field: 'p_image',
                  sort: 'asc',
                  width: 150
                  },
                  {
                   label: 'Post Content',
                   field: 'p_data',
                   sort: 'asc',
                   width: 150
                  },
                 {
                   label: 'Likes',
                   field: 'like',
                   width: 150
                },
                 {
                 label: 'Post Channel',
                 field: 'title',
                 sort: 'disabled',
                 width: 10
                }
              ];
              
              const reversedData = profilepost.slice().reverse();
              const rows = reversedData.map((post, index) => ({
                index: index + 1,
                p_image:  <img key={index} src={post.p_image} alt="" style={{ width: '100%' }} />,
                p_data: post.p_data,
                like: post.like,
                title: post.title,
              }));

              setProfilePost({ columns, rows });

            })
          }
          catch (err) {
          } 
      }
 
      const getPagePost = async () => {
        try {
          await API.getPagePosts().then(response => {
              const pagepost = response.data;
              const columns = [
                {
                  label: '#',
                  field: 'index',
                  sort: 'asc'
                },
                {
                  label: 'Post Image',
                  field: 'p_image',
                  sort: 'asc',
                  width: 150
                  },
                  {
                   label: 'Post Content',
                   field: 'p_data',
                   sort: 'asc',
                   width: 150
                  },
                  
                 {
                   label: 'Likes',
                   field: 'like',
                   width: 150
                },
               {
                label: 'Post Channel',
                field: 'post_channel',
                sort: 'disabled',
                width: 10
                 }
              ];
             
              const reversedData = pagepost.slice().reverse();
              const rows = reversedData.map((post, index) => ({
                index: index + 1,
                p_image:  <img key={index} src={post.p_image} alt="" style={{ width: '100%' }} />,
                p_data: post.p_data,
                like: post.like,
                post_channel: post.post_channel,
                numberOfShares: post.numberOfShares
              }));
              setPagePost({ columns, rows });
            })
          }
          catch (err) {
          } 
      }

    useEffect(() => {
        getProfilePost();
        getPagePost();
      }, []); 

  return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/facebook.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> User Account Posts</h4>
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
          large
          data={profilepost} 
        />
  </div>
  </div>

  <br />
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/facebook_group.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> Page Posts</h4>
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
          data={pagepost} 
        />
   </div>
   </div>
   <br />
  </div>
  </Box>
  )
}

export default FacebookPost