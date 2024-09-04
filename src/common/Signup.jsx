import React, {useState} from 'react'
import AuthService from "../API/AuthApi";
import { Box, Button, TextField, Tabs, Tab, Card, useTheme } from "@mui/material";
import { Header } from "../components";
import { tokens } from "../styles/theme";

const Signup=()=>{  
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
          await AuthService.signup(username, email, password);
            setUserName('');
            setEmail('');
            setPassword('');
            setError('');
            setSuccess('User was registered successfuly!');
        } catch (err) {
          if (err.message.includes('Network')) {
            setError('Network Error. Please check your internet connection and try again.');
          } else {
            setError("Failed! Username or Email are already in use!");
          }
        }
      };
     

return( 
    <Box m="2%" pt={16} display="flex" justifyContent="center" alignItems="center">
     <div className="col-sm-8"> 
      <Card>
       <Box sx={{bgcolor: 'background.paper' }}>
       <Tabs style={{backgroundColor: colors.blueAccent[600]}}>
       <Tab label="Create User" style={{fontWeight: 'bold'}}  />
       </Tabs>
       </Box>
       </Card>
       <br />
       <Header title="" subtitle="Create user accounts" />
                <form onSubmit={handleSignup}>
                <TextField label='Username' placeholder='Enter username' fullWidth required 
                 name="username"
                 value={username}
                 onChange={e => setUserName(e.target.value)}
              />
               <br />
                <br />
                <TextField label='Email' placeholder='Enter Email' type='email' fullWidth required 
                 name="email"
                 value={email}
                 onChange={e => setEmail(e.target.value)}
              />
               <br />
                <br />
                <TextField label='Password' placeholder='Enter password' type='password' fullWidth required
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
               />
                <br />
                <br />
                <Button type="submit" color="secondary" variant="contained" style={{width:'25%'}}>
                  Save
                </Button>
                <br />
                <br />
                <div>
                  {success ? (
                  <><large style={{ color: 'green' }}>{success}</large><br /></>
                   ) : error ? (
                   <><large style={{ color: 'red' }}>{error}</large><br /></>
                   ) : null}
                 </div>
               
        </form>
        </div>
       </Box>
    )     
}

export default Signup