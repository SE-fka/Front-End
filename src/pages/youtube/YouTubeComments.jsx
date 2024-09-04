import React, {useEffect, useState} from 'react'
import {Box, Card } from "@mui/material";
import AuthHeader from '../../API/AuthHeader';
import axios from 'axios';
import API from '../../API/YouTubeApi';
import { MDBDataTable } from 'mdbreact';

const url = API.getComments();


const YouTubeComments = () => {
  const divstyle={display: 'flex', justifyContent: 'center'}
  const cardstyle={display: 'flex', margin: '1%', justifyContent: 'center'}
  const imagestyle={height: '20px',width: '20px', opacity: .8}

  const [youtubeData, setYoutubeData] = useState({ columns: [], rows: [] });

  const query = new URLSearchParams(window.location.search);
  const doc_id = query.get('doc-id')

  useEffect(() => {
    axios.get(url + `comments/${doc_id}`, { headers: AuthHeader() })
      .then(response => {
        const comments = response.data.Comments
        ;
        const columns = [
          {
            label: '#',
            field: 'index',
            sort: 'asc'
           },
          {
            label: 'Comments',
            field: 'comment',
            sort: 'asc',
            width: 200
          },
        ];
        
        const rows = comments.map((comment, index) => ({
          index: index + 1,
          comment: comment,
         /*  action:  <a target="?" href={`${comment.comment_id}`} style={{textDecoration: 'none'}}> View Commenter </a> , */
        }));
        setYoutubeData({ columns, rows });
      })
      .catch(error => console.log('error', error));
  }, 
  // eslint-disable-next-line
  []);


  return (
    <Box m="2%" pt={10}>
    <div className="container-fluid">
    <div className="row" style={divstyle}>
    <div className="col-sm-10"> 
    <Card style={cardstyle}>
    <img alt="tw" src={'../../image/youtube.png'} style={imagestyle} />
    &nbsp;&nbsp;&nbsp;
    <h4> YouTube Comments</h4>
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
          data={youtubeData} 
        />
  </div>
  </div>
   <br />
  </div>
  </Box>
  )
}

export default YouTubeComments