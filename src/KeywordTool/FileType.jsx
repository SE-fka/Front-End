import React, { useState } from "react";
import { Card, TextField, Button, useTheme, Box, MenuItem, Select, Tabs, } from "@mui/material";
import { tokens } from "../styles/theme";
import API from '../API/KeywordToolApi';
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "axios";

const URL = API.getFileSearch();
const API_URL = API.getDocumentSearch();

const FileType = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const btnstyle={height: '52px', width: '12%', backgroundColor: colors.blueAccent[400]}
  const selectstyle={width: '18%'}
  const textfieldstyle={width: '60%'}  
  const cardstyle={display: 'flex', marginTop: '3%'}  
  const divstyle={display: 'flex', margin: '3%', justifyContent: 'center'}  

  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);
  const [error2, setError2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [filetype, setFileType] = useState([]); 
  const [filetypeData, setFileTypeData] = useState(null);

  const [filename, setFileName] = useState("");
  const [file_from, setFileFrom] = useState(null); 
  const [fileData, setFileData] = useState(null);

  const [email, setEmail] = useState("");
  const [file_type, setFile_Type] = useState(null);
  const [documentData, setDocumentData] = useState(null);
  const [titleData, setTitleData] = useState(null);

  //Searc file from differn document
  const getFileDoc = async (e) => {
   setFileTypeData('')
   e.preventDefault();
   try {
    setIsLoading(true);
    const response = await axios.post(URL, {
      keyword,
      filetype,
    });
    if (response.data.url.length > 0) {
      setFileTypeData(response.data.url);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError('No data found.');
    }
    setKeyword('');
    setFileType('');
  } catch (err) {
    setIsLoading(false);
    setError('Something went wrong. Please try again later.');
  }
};

//Discovering google drive and finding exposed sensitive documents
const getFileDrive = async (e) => {
   setFileData('')
   e.preventDefault();
   try {
    setIsLoading1(true);
    const response = await axios.post(URL, {
      filename,
      file_from
    });
    if (response.data.filename.length > 0) {
      setFileData(response.data.filename);
      setIsLoading1(false);
    } else {
      setIsLoading1(false);
      setError1('No data found.');
    }
    setFileName('');
    setFileFrom('');
  } catch (err) {
    setIsLoading1(false);
    setError1('Something went wrong. Please try again later.');
  }
};

//Get sensetive document with identifying Email in Corporate Reports
const getDocument = async (e) => {
  setDocumentData('');
  setTitleData('');
  e.preventDefault();
  try {
   setIsLoading2(true);
   const response = await axios.post(API_URL, {
     email:email,
     filetype:file_type
   });
   if (response.data.url.length > 0) {
    setDocumentData(response.data.url);
    setIsLoading2(false);
   }
   if (response.data.title.length > 0) {
    setTitleData(response.data.title);
    setIsLoading2(false);
   } else {
     setIsLoading2(false);
     setError2('No data found.');
   }
   setEmail('');
   setFile_Type('');
 } catch (err) {
   setIsLoading2(false);
   setError2('Something went wrong. Please try again later.');
 }
};

  return (
    <Box m="2%" pt={16} display="flex" justifyContent="center" alignItems="center">
    <div className="col-sm-10"> 
     <Card>
      <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs style={{backgroundColor: colors.blueAccent[600]}}>
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Post URL search from social media platforms </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getFileDoc}>
    <Select class="form-control"
      value={filetype}
      onChange={(e) => setFileType(e.target.value)} style={selectstyle} required>
      <MenuItem selected={"selected"}> -- File type --</MenuItem>
      <MenuItem value={"pdf"}> pdf</MenuItem>
      <MenuItem value={"xlsx"}> xlsx</MenuItem>
      <MenuItem value={"docx"}> docx</MenuItem>
      <MenuItem value={"txt"}> txt</MenuItem>
      <MenuItem value={"pptx"}> pptx</MenuItem>
      <MenuItem value={"csv"}> csv</MenuItem>
      <MenuItem value={"jpg"}> jpg</MenuItem>
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
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
  </form>
<Card style={cardstyle}>
 <div style={divstyle}>
  <>
  {error ? (
       <div>
        {error && <><large style={{ color: 'red' }}>{error}</large><br /></>}<br />
       </div>
       ):(
       <>
       {isLoading ? (
        <LoadingSpinner />
        ):(
         <>  </>
        )}
     </>
     )}
  </>
  {filetypeData && filetypeData.length > 0 && (
  <div>
    {filetypeData.map((item, index) => (
      <a href={item} target="_blank" rel="noopener noreferrer" key={index}>
        <h4>Click Here to View {item}</h4>
      </a>
    ))}
  </div>
)}
</div> 
</Card>

{/* For post from text */}
    <hr />
     <Card>
      <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs style={{backgroundColor: "#007BFF"}}>
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Keyword search from social media post </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getFileDrive}>
    <Select class="form-control"
      value={file_from}
      onChange={(e) => setFileFrom(e.target.value)} style={selectstyle} required>
      <MenuItem selected={"selected"}> -- Select document --</MenuItem>
      <MenuItem value={"google"}> Google Drive</MenuItem>
      <MenuItem value={"pdf"}> filetype:pdf</MenuItem>
      <MenuItem value={"docx"}> filetype:docx</MenuItem>
      <MenuItem value={"pptx"}> filetype:pptx</MenuItem>
      <MenuItem value={"txt"}> filetype:txt</MenuItem>
      <MenuItem value={"all"}> All</MenuItem>
    </Select>
    &nbsp;&nbsp; 
    <TextField
      label="Enter file name"
      style={textfieldstyle}
      value={filename}
      onChange={(e) => setFileName(e.target.value)}
      required
    />
   &nbsp;&nbsp; 
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
  </form>
<Card style={cardstyle}>
 <div style={divstyle}>
  <>
  {error1 ? (
       <div>
        {error1 && <><large style={{ color: 'red' }}>{error1}</large><br /></>}<br />
       </div>
       ):(
       <>
       {isLoading1? (
        <LoadingSpinner />
        ):(
         <>  </>
        )}
     </>
     )}
  </>
  {fileData && fileData.length > 0 && (
  <div>
    {fileData.map((item, index) => (
      <a href={item} target="_blank" rel="noopener noreferrer" key={index}>
        <h4>Click Here to View {item}</h4>
      </a>
    ))}
  </div>
)}
</div> 
</Card>

{/* Sensetive document with identifying Email */}
    <hr />
     <Card>
      <Box sx={{bgcolor: 'background.paper' }}>
      <Tabs style={{backgroundColor: "#6C757D"}}>
      <h6 style={{fontWeight: 'bold', margin: '1%'}}> Search sensetive document with identifying Email in Corporate reports </h6>
      </Tabs>
      </Box>
      </Card>
       <br />
    <form onSubmit={getDocument}>
    <Select class="form-control"
      value={file_type}
      onChange={(e) => setFile_Type(e.target.value)} style={selectstyle} required>
      <MenuItem selected={"selected"}> -- Select document --</MenuItem>
      <MenuItem value={"pdf"}> filetype:pdf</MenuItem>
      <MenuItem value={"docx"}> filetype:docx</MenuItem>
      <MenuItem value={"all"}> All</MenuItem>
    </Select>
    &nbsp;&nbsp; 
    <TextField
      label="Enter Email"
      type="email"
      style={textfieldstyle}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
   &nbsp;&nbsp; 
    <Button type='submit' variant="primary" style={btnstyle}>Search</Button>
  </form>
<Card style={cardstyle}>
 <div style={divstyle}>
  <>
  {error2 ? (
       <div>
        {error2 && <><large style={{ color: 'red' }}>{error2}</large><br /></>}<br />
       </div>
       ):(
       <>
       {isLoading2? (
        <LoadingSpinner />
        ):(
         <>  </>
        )}
     </>
     )}
  </>
  {/* Iterate over the documentData and titleData arrays simultaneously */}
  {documentData && documentData.length > 0 && (
  <div>
  {documentData.map((doc, index) => (
          <React.Fragment key={index}>
            <h4>{titleData[index]}</h4>
            <a href={doc} target="_blank" rel="noopener noreferrer">
              <h4>{doc}</h4>
            </a>
            <br />
          </React.Fragment>
        ))}
  </div> 
  )}
</div> 
</Card>
<br/>
<br/>
  </div>
  </Box>
  )
}

export default FileType