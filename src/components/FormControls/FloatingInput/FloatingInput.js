import React from 'react';
import {
  fade,
  ThemeProvider,
  withStyles,
  makeStyles,
  createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '5px 10px'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '5px 10px'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
        borderRadius: '25px',
        height: '40px',
        width: '400px'
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  },
})(TextField);

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedInputs() {
  const classes = useStyles();

  return (
      <CssTextField
        className={classes.margin}
        label="Custom CSS"
        variant="outlined"
        id="custom-css-outlined-input"
      />
  );
}
