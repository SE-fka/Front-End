import React, { useState } from "react";
import { Card, TextField, Button, useTheme, Box, Tabs } from "@mui/material";
import { tokens } from "../styles/theme";
import API from "../API/KeywordToolApi";
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";
import { TelegramDataTable } from "./data/TelegramDataTable";

const URL = API.getTelegramSearch();

const TelegramSearch = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle = {
    height: "52px",
    width: "12%",
    backgroundColor: colors.blueAccent[400],
  };
  const textfieldstyle = { width: "60%" };

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [telegramData, setTelegramData] = useState(null);
  const [urlData, setUrlData] = useState(null);

  //Telegram search
  const getTelegramData = async (e) => {
    setTelegramData("");
    setUrlData("");
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(URL, {
        keyword,
      });
      if (response.data.response.length > 0) {
        setTelegramData(response.data.response);
        setIsLoading(false);
      }
      if (response.data.url.length > 0) {
        setUrlData(response.data.url);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError("No data found.");
      }
      setKeyword("");
    } catch (err) {
      setIsLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <Box m="3%" pt={16} display="flex" justifyContent="center" alignItems="center">
       <div className="col-sm-10">
          <Card>
            <Box sx={{ bgcolor: "background.paper" }}>
              <Tabs style={{ backgroundColor: colors.blueAccent[600] }}>
                <h6 style={{ fontWeight: "bold", margin: "1%" }}>
                  Telegram Search
                </h6>
              </Tabs>
            </Box>
          </Card>
          <br />

          <form onSubmit={getTelegramData}>
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
          <div className="col-sm-12">
          <div style={{ display: "flex", marginTop: "3%" }}>
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

        {urlData && urlData.length > 0 && (
          <div>
            <a href={urlData} target="_blank" rel="noopener noreferrer">
              <h4>Click Here to View {urlData}</h4>
            </a>
          </div>
        )}
      </div>
        <div className="col-sm-12">
          {telegramData ? <TelegramDataTable data={telegramData} /> : <></>}
        </div>
        </div>
      </div>
    </Box>
  );
};

export default TelegramSearch;
