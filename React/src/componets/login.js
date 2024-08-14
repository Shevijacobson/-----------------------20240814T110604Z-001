import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import * as server from '../axios/user'

const Login = () => {
  const [nameUser, setNameUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const checkUser = () => {
    dispatch(server.checkUser({ setShowError, nameUser, password }))
  }

  return (
    <div>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: "800px",
          alignItems: 'center',
          '& > :not(style)': { m: 1 },
        }}
      >
        <TextField sx={{ width: '300px' }}
          onChange={(ev) => setNameUser(ev.target.value)}
          helperText="הכנס שם משתמש"
          label="שם משתמש"
          value={nameUser}

        />
        <TextField sx={{ width: '300px' }}
          onChange={(ev) => setPassword(ev.target.value)}
          helperText="הכנס סיסמה "
          label="סיסמה"
          value={password}
        />
      </Box>
      <Button primary onClick={checkUser}>כניסה</Button>

      {/* הערה שהשם משתמש לא תקין+ קישור להרשמה */}
      {showError ? <div>
        <p> הכנס שם משתמש וסיסמה אינם תקינים או  </p>
        <Link to={"/signup"} >הרשם</Link>
      </div> : null
      }
    </div>

  )
}

export default Login
