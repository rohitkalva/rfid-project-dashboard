import React, {Component} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightRegular,
  },
  form: {
    // width: '100%', // Fix IE 11 issue.
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 4,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    alignItems: 'center',
  },
});

class Usermanagement extends Component{

    constructor() {
        super();
        this.state = {
          password:"",
          email: "",
          emailerror: false,
          buttonstate: true,
          uname:""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.unamevalidation = this.unamevalidation.bind(this);
        this.handlepassword = this.handlepassword.bind(this);
        this.emailvalidation = this.emailvalidation.bind(this);
      }

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

          setTimeout(this.changerandom(e), 7000);
    }

    unamevalidation(uname){
        this.setState({
            uname: uname
        })
    }

    handlepassword(password){
        console.log(password)
        this.setState({
            password:password
        })
    }

    //Function to check email in proper structure
    validEmail(email) {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    emailvalidation(email){

        this.setState({
            email: email
        })
        var em = this.validEmail(email)
        if(em !== true){
            this.setState({
                emailerror: true,
                buttonstate:true
            })
        }
        else{
            this.setState({
                emailerror: false,
                buttonstate: false
            })
        }
    }

    changerandom(e) {
    e.target.reset();
    this.setState({
        password:"",
        email:"",
        uname:""
    })
  }

    
   
    render(){
        const { classes } = this.props;
        const {password, email, emailerror, buttonstate, uname} = this.state
      return(
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Create New User</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <form className={classes.form}  id="myForm" onSubmit={this.handleSubmit} autoComplete="off"  noValidate>
            {/* {login_error_text} */}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" name="name" autoComplete="name" autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">User Name</InputLabel>
              <Input 
              id="username" 
              name="username" 
              autoComplete="username" 
              autoFocus 
              value={uname}
              onChange={(e) =>{this.unamevalidation(e.target.value) }}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input 
              error={emailerror}
              id="email" 
              type ="email" 
              name="email" 
              value={email}
              autoComplete="email" 
              autoFocus
              onChange={(e) =>{this.emailvalidation(e.target.value) }}
              />
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input 
              name="password" 
              type="password" 
              id="password" 
              autoComplete="current-password"
              value={password}
              onChange={(e) =>{this.handlepassword(e.target.value)}}
              />
            </FormControl>

            <Button
            disabled={buttonstate}
              type="submit"
              id="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create User
            </Button>
          </form>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Expansion Panel 2</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel disabled>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </div>
      );
    }
  }

  Usermanagement.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  export default withStyles(styles)(Usermanagement);
