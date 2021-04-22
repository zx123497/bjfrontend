import React from 'react'
import { makeStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    textField: {
      width: '80%',
      marginTop: "25px",
    },
}));

const PasswordInput2 = (props) => {
    
    const classes = useStyles();
    
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({...values, [props]: event.target.value });
        console.log('pwInput 2 :'+ values.password);
    };

    const handleSubmit = (event) =>  {
        alert('submit pw:'+ values.password);
        event.preventDefault();
    };

    const onInputchange=(event) =>{
        setValues({...values, [props]: event.target.value });
    }

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const styles = {
        button: {
          width: 30, 
          height: 30,
          marginRight:"0.1%",
        },
        icon: {
          width: 30, 
          height: 30,
        },
    };

    return ( 
        <div >
            <form onSubmit={handleSubmit}>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-password">{props.field}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={props.password}
                onChange = {handleChange}
                //onChange = {handleChange('password')}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        style={styles.button}
                        iconstyle={styles.icon}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                </InputAdornment>
                }
                labelWidth={35}/>
            </FormControl>
            </form>
        </div>
    )
}

export default PasswordInput2