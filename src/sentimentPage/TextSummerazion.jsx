import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  Typography,
} from '@mui/material'

import axios from 'axios'
import { useState } from 'react'
import { useTheme } from "@emotion/react";
import { tokens } from "../styles/theme";
import API from '../API/SentimentApi';

const url = API.Summarization();

function TextSummerazion () {
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  const sendText = (event) => {
    setLoading(true)

    axios
      .get(url + `text_summary?input=${input}`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Headers': true,
          // 'Access-Control-Request-Headers': true,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
      
        if(res.data){
          setResponse(res.data)
          setLoading(false)
          console.log(res.data)
        }
        if(res.data[0].summary_text){
          setResponse(res.data[0].summary_text)
          setLoading(false)
          console.log(res.data[0].summary_text)
        }
  
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }

  const handleFileUpload = (event) => {
    let selectedFile = event.target.files[0]
    if (selectedFile) {
      const fileReader = new FileReader()

      fileReader.onload = async () => {
        setLoading(true)

        const text = fileReader.result

        try {
          const response = await axios.get(url + `text_summary?input=${encodeURIComponent(text)}`,
          )
          
          if(response.data){
            setResponse(response.data)
            setLoading(false)
            console.log(response.data)
          }
          if(response.data[0].summary_text){
            setResponse(response.data[0].summary_text)
            setLoading(false)
            console.log(response.data[0].summary_text)
          }
          
        
        } catch (error) {
          console.error(error)
          setLoading(false)
        }
      }

      fileReader.readAsText(selectedFile)
    }
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([response], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'text.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(response)
    alert('Text copied')
  }

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const btnstyle={backgroundColor: colors.blueAccent[400]}

  return (
    <Box m="3%" pt={16}>
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Text Summarization</h1>
      <br />
      <Box m="20px">
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <box>
              <FormControl style={{ spacing: '30' }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  style={{ width: '300px', height: '50px' }}
                  placeholder="Enter Text"
                  id="full"
                  required />

                <Button
                  onClick={sendText}
                  variant="contained"
                  sx={{ mt: '30px' }}
                  style={btnstyle}>
                  Next
                </Button>
              </FormControl>
            </box>
          </Grid>
          <Grid
            sx={{
              border: '1px solid lightgray',
              borderRadius: '25px',
              ml: 5,
              width: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
          {response && (
            <>
              <Box
                boxShadow={3}
                padding={2}
                borderRadius={8}
                maxHeight={400}
                sx={{ width: '70%' }}
                overflow="auto"
                wordWrap="break-word"
              >
                <Typography variant="body1">{response}</Typography>
              </Box>
              <Box>
                <Button
                  onClick={handleDownload}
                  variant="contained"
                  sx={{ mt: '30px' }}
                  style={btnstyle}>
                  Download
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="contained"
                  sx={{ mt: '30px', ml: '10px', width: '120px' }}
                  style={btnstyle}>
                  Copy
                </Button>
              </Box>
            </>
          )}
        </>
      )}
    </div>
    </Box>
  )
}
export default TextSummerazion