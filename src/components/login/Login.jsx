import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/Textfield';
import Button from '@material-ui/core/Button';
import {Checkbox, FormControlLabel} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '25ch'
  },
  wrapper: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    margin: '2 0'
  }
}))

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function handleChange(e) {
    const fieldName = e.target.name;
    fieldName === 'username' && setUsername(e.target.value);
    fieldName === 'password' && setPassword(e.target.value);
    console.log(username);
    console.log(password);
  }
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <form className={classes.root}>
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          margin="normal"
          onChange={handleChange}
          autoFocus
          fullWidth
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          name="password"
          variant="outlined"
          margin="normal"
          autoComplete="current-password"
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label={"Remember Username"}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disableElevation
          fullWidth
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
