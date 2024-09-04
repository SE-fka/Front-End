import React, {useEffect, useState} from 'react'
import {Box, Card } from "@mui/material";
import API from '../../API/FacebookApi';
import LoadingSpinner from "../../common/LoadingSpinner";

const FocebookPage = () => {
  const [pages, setPage] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      getPages();
  }, []);

  const getPages = async () =>{
    try {
      setIsLoading(true);
      await API.getPagePosts()
      .then(response => setPage(response.data),
      (error) => {
        if (error.response.status === 401){
          setError("UnAuthorized. Token Expired Please login again.");
          }
      });  
      setIsLoading(false);
    }
    catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
    }   
  }

  const fb_pages= Array.from(new Set(pages.map(x=>x.post_channel)))
  .map(post_channel => {
   return {
    post_channel: post_channel
   }});
 
 
  return (
    <Box>
      <Card style={{ display: "flex", margin: "3%", justifyContent: "center" }}>
        <img
          alt="fb"
          src={"../../image/facebook_group.png"}
          style={{ height: "20px", width: "20px", opacity: 0.8 }}
        />
        &nbsp;&nbsp;&nbsp;
        <h4> Group and Pages</h4>
      </Card>
      <div className="row" style={{ display: "flex", justifyContent: "left" }}>
        {fb_pages.map((page, key) => (
          <div className="col-lg-4">
            <Card>
              <img
          alt="fb"
          src={"../../image/facebook_group.png"}
          style={{ height: "20px", width: "20px", opacity: 0.8 }}
        />
               
              <h5 style={{color:'blue'}}>
                &nbsp;<b>{page.post_channel}</b>
                &nbsp;
              </h5>
            </Card>
            <hr />
          </div>
        ))}

        {error ? (
          <div>
            {error && (
              <>
                <large style={{ color: "red" }}>{error}</large>
                <br />
              </>
            )}
            <br />
          </div>
        ) : (
          <>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>{fb_pages.length === 0 && <div>Result Not Found</div>}</>
            )}
          </>
        )}
      </div>
    </Box>
  );
}

export default FocebookPage