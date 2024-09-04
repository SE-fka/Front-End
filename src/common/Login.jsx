import React, {useState} from 'react'
import { Grid, Paper, Avatar, TextField, Button } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate  } from "react-router-dom";
import AuthService from "../API/AuthApi";

 
const Login=()=>{  

    const avatarStyle={backgroundColor:'#3163B4'}
    const btnstyle={margin:'8px 0', height: '50px', backgroundColor: '#3163B4'}
    const divstyle={display: 'flex', marginTop: '5%', justifyContent: 'center'}

    let navigate = useNavigate ();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await AuthService.login(username, password).then(
          () => {
            navigate("/");
            window.location.reload();
          },
          (error) => {
            if (error.response.status === 404){
            setError("Username is incorrect. Please try again.");
            }
            if (error.response.status === 401){
              setError("Password is incorrect. Please try again.");
              }
          }
        );
      } catch (err) {
        setError("Network Error. Please try again later.");
      }
      
    };

return(
<div className="container-fluid"   style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
      }}>
    <div className="row" style={divstyle}>
     <div className="col-sm-6">
        <Grid align='center'>
          <br />
          <br />
          <img 
                 alt="profile-user"
                 width="100%"
                 height="100%"
                 src={'../../image/login.png'}
                  />
              </Grid>
       </div>

      <div className="col-sm-5">
           <Paper>
             <br />
             <br />
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <div style={{margin: '3%'}}>
                   <form onSubmit={handleLogin}>
                <TextField label='Username' placeholder='Enter username' fullWidth required 
                 name="username"
                 value={username}
                 onChange={e => setUserName(e.target.value)}
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
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth> Sign in </Button>
                {error && <><large style={{ color: 'red' }}>{error}</large><br /></>}<br />
                </form>
                </div>
              <br />
            <br />
        </Paper>
    
      </div>
    </div>
    </div>
    )     
}

export default Login