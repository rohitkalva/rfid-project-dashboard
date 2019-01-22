import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header'
//Styling
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

//Main function

class Login extends Component{

    constructor() {
        super();
        this.state = {
          username: "",
          password:"",
          login_error_text: "",
          error_state: false,
          isLoggedin: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      //Default render function to check for existing username in localstorage. 
      componentDidMount(){
          const date = localStorage.getItem('timestamp'); // eslint-disable-next-line
          const timestamp = date && new Date(parseInt(date));
          const now = new Date();

          const dataAge = Math.round((now - timestamp) / (1000 * 60))
            
          //loop to check for age of data in localstorage. Use the same data if not old than 60 minutes
          if(dataAge <= 60){
          localStorage.getItem("username") && this.setState({
            //   username: localStorage.getItem("username"),
              isLoggedin: true
          })
          localStorage.setItem("timestamp", Date.now())
          }

          //Removing old data from localstorage
          else {
            localStorage.removeItem("username")
            localStorage.removeItem("timestamp")
          }

      }

    //Handlesubmit function to handle post API calls
    handleSubmit(e){
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);

        function stringifyFormData(fd) {
            const data = {};
            for (let key of fd.keys()) {
              data[key] = fd.get(key);
            }
            return JSON.stringify(data, null, 2);
          }
          var jsondata = JSON.parse(stringifyFormData(data));
          console.log(jsondata);
          
          var self = this

          //Axios Post call for validating username and password
          axios({
              method: "post",
              url: "http://141.44.18.16:1080/api/authenticate",
              data: jsondata
          }) 
          .then(function(response) {
              const res = response.data.message
            console.log(response.data.message);
            if(res === "Successful"){
                self.setState({
                    error_state: false,
                    isLoggedin: true
                })

                localStorage.setItem("username", jsondata.username)
                localStorage.setItem("timestamp", Date.now())
            }
            else if(res === "Mismatch"){
                self.setState({
                    error_state: true,
                    login_error_text: "Incorrect password. Try again with correct password"
                })
            }
            else if(res === "No User"){
                self.setState({
                    error_state: true,
                    login_error_text: "User not found. Contact Admin"
                })
            }
        
          })
          .catch(function(error) {
            console.log(error);
            
          });

    }

    render(){
        const { classes } = this.props;
        const {error_state, login_error_text, isLoggedin} = this.state

        //Checking for isLoggedin status to re-direct user to main page. 
        if(isLoggedin === true){
            return(
                 <BrowserRouter>
                 <Header />
                 </BrowserRouter> 
            )
        }
      return (
        <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}  id="myForm" onSubmit={this.handleSubmit} noValidate>
            {login_error_text}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">User Name</InputLabel>
              <Input id="username" name="username" autoComplete="username" autoFocus  error={error_state} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" error={error_state}/>
            </FormControl>
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
     
      )
    }
  }
  

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);