import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  Tabs,
} from "@mui/material";
import API from "../API/KeywordToolApi";
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";

const URL = API.getFindLocation();

const LocationSearch = () => {
  const btnstyle = {
    height: "40px",
    width: "40%",
    backgroundColor: "#6C757D", 
  };
  const textfieldstyle = { width: "80%" };
  const divstyle = { display: "flex", margin: "3%" };
  const selectstyle = { width: "80%" };
  const btndivstyle = { display: "flex", justifyContent: 'center' };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [location_from, setLocationFrom] = useState("");
  const [data, setData] = useState("");

  const getTargetData = async (e) => {
    setData("");
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(URL, {
        keyword,
        location,
        location_from,
      });
      setData(response.data);
      setIsLoading(false);
      setKeyword("");
      setLocation("");
      setLocationFrom("");
    } catch (err) {
      setIsLoading(false);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <Box m="2%" pt={16} display="flex" justifyContent="center" alignItems="center">
      <div className="col-sm-10">
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
              <div className="btn-group">
                  <Link to="searchtarget" className="btn btn-primary">
                    Target Search
                    </Link>
                </div>
                &nbsp;&nbsp;
                <div className="btn-group">
                <Link to="locationsearch" className="btn btn-info">
                    Find From Location
                </Link>
                </div>
                &nbsp;&nbsp;
                <div className="btn-group">
                  <Link to="findlocation" className="btn btn-secondary">
                    Find From Social Media
                  </Link>
                </div>
                <br />
                <br />
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="tab1">
                    <div className="card card-primary">
                    <Box sx={{bgcolor: 'background.paper' }}>
                      <Card>
                        <Box sx={{ bgcolor: "background.paper" }}>
                          <Tabs
                            style={{ backgroundColor: "#6C757D" }}
                          >
                            <h6 style={{ fontWeight: "bold", margin: "1%" }}>
                              Search within a specific location and on a specific social media platform
                            </h6>
                          </Tabs>
                        </Box>
                      </Card>
                      <form onSubmit={getTargetData}>
                        <div className="card-body">
                          <div className="form-group">
                            <label>Enter keyword: </label>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <TextField
                              style={textfieldstyle}
                              label="name"
                              required
                              value={keyword}
                              onChange={(e) => setKeyword(e.target.value)}
                            />
                            <br />
                            <br />
                            <label>Enter the location name:</label>
                            &nbsp;&nbsp; &nbsp;&nbsp;
                            <TextField
                              style={textfieldstyle}
                              label="location"
                              required
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                            <br />
                            <br />
                            <label>Enter the platform name:</label>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Select
                              class="form-control"
                              value={location_from}
                              onChange={(e) => setLocationFrom(e.target.value)}
                              style={selectstyle}
                              required
                            >
                              <MenuItem selected={"selected"}>
                                {" "}
                                -- Select platform --
                              </MenuItem>
                              <MenuItem value={"Facebook"}> Facebook</MenuItem>
                              <MenuItem value={"Twitter"}> Twitter</MenuItem>
                              <MenuItem value={"all"}> All</MenuItem>
                            </Select>
                            <br />
                            <br />
                            <div style={btndivstyle}>
                            <Button
                              type="submit"
                              variant="primary"
                              style={btnstyle}
                            >
                              Search
                            </Button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div style={divstyle}>
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
                        {data && (
                          <a
                            href={data.data}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h4>Click Here View {data.data}</h4>
                          </a>
                        )}
                      </div>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Box>
  );
};

export default LocationSearch;
