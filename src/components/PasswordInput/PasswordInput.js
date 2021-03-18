import React from 'react'
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    btn:{
        position:"fixed",
        top:"10px",
        left:"15px"
    }
}));

const PasswordInput=(props)=> {
    const classes=useStyles();

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
    return (
        <div>
            <Input component={TextField}
                    id="standard-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                        </InputAdornment>
                    }/>
        </div>
    )
}

export default PasswordInput
