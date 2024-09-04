import React, { useState } from "react";
import {
  Card,
  TextField,
  Button,
  useTheme,
  Box,
  MenuItem,
  Select,
  Tabs,
} from "@mui/material";
import { tokens } from "../styles/theme";
import API from "../API/KeywordToolApi";
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";
import { HarvestDataTable } from "./data/HarvestDataTable";

const URL = API.getEmailSearch();
const API_URL = API.getHarvestEmail();

const EmailPhone = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle = { height: "52px", width: "12%", backgroundColor: colors.blueAccent[400]};
  const selectstyle = { width: "18%" };
  const textfieldstyle = { width: "60%" };
  const cardstyle={display: 'flex', marginTop: '3%'}  
  const divstyle={display: 'flex', margin: '3%', justifyContent: 'center'} 

  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [email_from, setEmailFrom] = useState([]);
  const [emailData, setEmailData] = useState(null);

  const [searchkeyword, setSearchKeyword] = useState("");
  const [harvestData, setHarvestData] = useState(null);
  const [urlData, setUrlData] = useState(null);

  //For email and phone search
  const getEmilPhone = async (e) => {
    setEmailData("");
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(URL, {
        keyword,
        email_from,
      });
      if (response.data.url.length > 0) {
        setEmailData(response.data.url);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("No data found.");
      }
      setKeyword("");
      setEmailFrom("");
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  //For harvesting email data
  const getHarvestEmail = async (e) => {
    setHarvestData("");
    setUrlData("");
    e.preventDefault();
    try {
      setIsLoading1(true);
      const response = await axios.post(API_URL, {
        searchkeyword,
      });
      if (response.data.response.length > 0) {
        setHarvestData(response.data.response);
        setIsLoading1(false);
      }
      if (response.data.keyword.length > 0) {
        setUrlData(response.data.keyword);
        setIsLoading1(false);
      } else {
        setIsLoading1(false);
        setError1("No data found.");
      }
      setSearchKeyword("");
    } catch (err) {
      setIsLoading1(false);
      setError1("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box m="2%" pt={16} display="flex" justifyContent="center" alignItems="center">
      <div className="col-sm-10">
        <Card>
          <Box sx={{ bgcolor: "background.paper" }}>
            <Tabs style={{ backgroundColor: colors.blueAccent[600] }}>
              <h6 style={{ fontWeight: "bold", margin: "1%" }}>
                {" "}
                Extract emails and phones from social media platforms{" "}
              </h6>
            </Tabs>
          </Box>
        </Card>
        <br />
        <form onSubmit={getEmilPhone}>
          <Select
            class="form-control"
            value={email_from}
            onChange={(e) => setEmailFrom(e.target.value)}
            style={selectstyle}
            required
          >
            <MenuItem selected={"selected"}> -- Select platform --</MenuItem>
            <MenuItem value={"Facebook"}> Facebook</MenuItem>
            <MenuItem value={"Twitter"}> Twitter</MenuItem>
            <MenuItem value={"Linkedin"}> Linkedin</MenuItem>
            <MenuItem value={"Google"}> Google</MenuItem>
            <MenuItem value={"Youtube"}> Youtube</MenuItem>
            <MenuItem value={"Tiktok"}> Tiktok</MenuItem>
            <MenuItem value={"Instagram"}> Instagram</MenuItem>
            <MenuItem value={"all"}> All</MenuItem>
          </Select>
          &nbsp;&nbsp;
          <TextField
            label="Enter keyword"
            style={textfieldstyle}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            required
          />
          &nbsp;&nbsp;
          <Button type="submit" variant="primary" style={btnstyle}>
            Search
          </Button>
        </form>
        <Card style={cardstyle}>
          <div style={divstyle}>
            <>
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
                <>{isLoading ? <LoadingSpinner /> : <> </>}</>
              )}
            </>
            {emailData && emailData.length > 0 && (
              <div>
                {emailData.map((item, index) => (
                  <a
                    href={item}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    <h4>Click Here to View {item}</h4>
                  </a>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* For Email harvesting */}
        <hr />
        <Card>
          <Box sx={{ bgcolor: "background.paper" }}>
            <Tabs style={{ backgroundColor: "#007BFF" }}>
              <h6 style={{ fontWeight: "bold", margin: "1%" }}>
                {" "}
                Harvesting Emails from different social media platforms{" "}
              </h6>
            </Tabs>
          </Box>
        </Card>
        <br />
        <form onSubmit={getHarvestEmail}>
          <TextField
            label="Enter keyword"
            style={textfieldstyle}
            value={searchkeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            required
          />
          &nbsp;&nbsp;
          <Button type="submit" variant="primary" style={btnstyle}>
            Search
          </Button>
        </form>
        <div className="col-sm-12">
          <div style={{ display: "flex", marginTop: "3%" }}>
            {error1 ? (
              <div>
                {error1 && (
                  <>
                    <large style={{ color: "red" }}>{error1}</large>
                    <br />
                  </>
                )}
                <br />
              </div>
            ) : (
              <>{isLoading1 ? <LoadingSpinner /> : <> </>}</>
            )}
            {urlData && urlData.length > 0 && (
              <h4>Search Keyword is {urlData}</h4>
            )}
          </div>

          <div className="col-sm-12">
            {harvestData && <HarvestDataTable data={harvestData} /> }
          </div>
        </div>
      </div>
    </Box>
  );
};

export default EmailPhone;
