import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  useTheme,
  Box,
  Tabs,
} from "@mui/material";
import { tokens } from "../styles/theme";
import API from "../API/KeywordToolApi";
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";

const URL = API.getTargetSearch();

const TargetSearch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle = {
    height: "40px",
    width: "40%",
    backgroundColor: colors.blueAccent[400],
  };
  const textfieldstyle = { width: "80%" };
  const divstyle = { display: "flex", margin: "3%" };
  const btndivstyle = { display: "flex", justifyContent: 'center' };
  
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [profession, setProfession] = useState("");
  const [data, setTargetData] = useState(null);

  const getTargetData = async (e) => {
    setTargetData("");
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(URL, {
        name,
        location,
        profession,
      });
      setTargetData(response.data);
      setIsLoading(false);
      setName("");
      setLocation("");
      setProfession("");
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
                            style={{ backgroundColor: colors.blueAccent[600] }}
                          >
                            <h6 style={{ fontWeight: "bold", margin: "1%" }}>
                              Searching the target in different location
                            </h6>
                          </Tabs>
                        </Box>
                      </Card>
                      <form onSubmit={getTargetData}>
                        <div className="card-body">
                          <div className="form-group">
                            <label>Enter the person's name: </label>
                            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <TextField
                              style={textfieldstyle}
                              label="name"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <br />
                            <br />
                            <label>Enter the person's location:</label>
                            &nbsp;&nbsp; &nbsp;&nbsp;
                            <TextField
                              style={textfieldstyle}
                              label="location"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                            <br />
                            <br />
                            <label>Enter the person's profession:</label>
                            &nbsp;&nbsp;
                            <TextField
                              style={textfieldstyle}
                              label="profession"
                              value={profession}
                              onChange={(e) => setProfession(e.target.value)}
                            />
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
                            href={data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <h4>Click Here View {data.url}</h4>
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

export default TargetSearch;
