import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import ChartComponent from "./SentimentChart";
import { useTheme } from "@emotion/react";
import { tokens } from "../styles/theme";
import API from '../API/SentimentApi';

const url = API.Sentiment();

const Sentiment = () => { 
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState();
  const [input, setInput] = useState("");
  const [responses, setResponses] = useState([]);
  const [positiveCount, setPositiveCount] = useState(0);
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [positivePercentage, setPositivePercentage] = useState();
  const [negativePercentage, setNegativePercentage] = useState();
  const [neutralPercentage, setNeutralPercentage] = useState();
 

  const sendText = async (event) => {
    setLoading(true);
   
    fetch(url + '?text=' +document.getElementById("full").value, {
  
      method: 'GET',
      headers: {'Content-Type':'application/json'},

    }).then(response => {
  
        response.json().then(json => {
          console.log(json);
          setLoading(false);
          setText(json);
        });
      
    });

  }


  const handleFileUpload = (event) => {
    let file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const contents = e.target.result;
      const lines = contents.split("\n");

      const requests = lines
        .map((line) => line.trim())
        .filter((line) => line !== "");

      const fetchPromises = requests.map((line) =>
        fetch(url + `classify/?text=${encodeURIComponent(line)}`
        ).then((response) => response.json())
      );

      Promise.all(fetchPromises)
        .then((allResponses) => {
          setResponses(allResponses);
          console.log(allResponses);
          file = null;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    reader.readAsText(file);
  };

  const countSentiments = () => {
    let positive = 0;
    let negative = 0;
    let neutral = 0;

    responses.forEach((response) => {
      if (response.text_sentiment === "positive") {
        positive++;
      } else if (response.text_sentiment === "negative") {
        negative++;
      } else if (response.text_sentiment === "neutral") {
        neutral++;
      }
    });

    setPositiveCount(positive);
    setNegativeCount(negative);
    setNeutralCount(neutral);

    const totalCount = responses.length;

    setPositivePercentage(((positive / totalCount) * 100).toFixed(2));
    setNegativePercentage(((negative / totalCount) * 100).toFixed(2));
    setNeutralPercentage(((neutral / totalCount) * 100).toFixed(2));
  };

  const renderSentiment = (sentiment) => {
    if (sentiment === "positive") {
      return <span style={{ color: "green" }}>{sentiment}</span>;
    } else if (sentiment === "negative") {
      return <span style={{ color: "red" }}>{sentiment}</span>;
    } else {
      return sentiment;
    }
  };
  const calculatePercentage = (count, total) => {
    return (count / total) * 100;
  };
  let totalCount = responses.length;
  useEffect(() => {
    if (responses.length > 0) {
      countSentiments();
    }
    
  }, [responses]);

  useEffect(() => {}, [positiveCount]);


  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const btnstyle={backgroundColor: colors.blueAccent[400]}

  return (
    <Box m="3%" pt={16}>
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Sentiment Anylitics</h1>
      <br />
      <Box m="20px">
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <box>
              <FormControl style={{ spacing: "30" }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ width: "300px", height: "50px" }}
                  placeholder="Enter Text"
                  id="full"
                  required />

                <Button
                  onClick={sendText}
                  variant="contained"
                  sx={{ mt: "30px" }}
                  style={btnstyle}>
                  Next
                </Button>
              </FormControl>
            </box>
          </Grid>
          <Grid
            sx={{
              border: "1px solid lightgray",
              borderRadius: "25px",
              ml: 5,
              width: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            item
            xs={6}
            md={4}
          >
            <box>
              <FormControl sx={{}}>
                <Input
                  id="my-input2"
                  type="file"
                  aria-describedby="my-helper-text"
                  onChange={handleFileUpload}
                />
              </FormControl>
            </box>
          </Grid>
        </Grid>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
      {text && <h1>Sentiment : {text.text_sentiment}</h1>}
      {responses[0] && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Sentiment</TableCell>
                <TableCell>Count</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Positive</TableCell>
                <TableCell>{positiveCount}</TableCell>
                <TableCell>
                  {calculatePercentage(positiveCount, responses.length)}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Negative</TableCell>
                <TableCell>{negativeCount}</TableCell>
                <TableCell>
                  {calculatePercentage(negativeCount, responses.length)}%
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Neutral</TableCell>
                <TableCell>{neutralCount}</TableCell>
                <TableCell>
                  {calculatePercentage(neutralCount, responses.length)}%
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </>
     )}
      <ChartComponent
        data={[
          {
            name: "Positive",
            value: calculatePercentage(positiveCount, responses.length),
          },
          {
            name: "Negative",
            value: calculatePercentage(negativeCount, responses.length),
          },
          {
            name: "Neutral",
            value: calculatePercentage(neutralCount, responses.length),
          },
        ]}
      />
    </div>
    </Box>
  );
}
export default Sentiment