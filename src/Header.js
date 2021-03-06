import React, {Component, Fragment} from 'react'
import { Switch, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Home from './Home'
import Registration from './Reg'
import UpdateOldData from './UpdateOldData'
import getreport from './getreport';
import Usermanagement from './usermanagement'
import FileUploadCheck from './fileuploadcheck'
import Logout from './logout'
import Login from './login'

// The Header creates links that can be used to navigate
// between routes.

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  
};


class Header extends Component{
  handleCallToRouter = (value) => {
    this.props.history.push(value);
  }
  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      
      
      <Route
          path="/"
          render={({ location }) => (
            <Fragment>
              <AppBar position="static">
              <Tabs value={location.pathname}>
                <Tab label="Home" component={Link} to="/" />
                <Tab label="New Product Registration" component={Link} to="/Reg" />
                <Tab label="Download Report" component={Link} to="/getreport" />
                {/* <Tab label="Update Old Data" component={Link} to="/UpdateOldData" /> */}
                <Tab label="User Management" component={Link} to="/usermanagement" />
                <Tab label ="File Browser" component={Link} to="/file-browser" />
                {/* <Tab label="Upload Check" component={Link} to="/uploadcheck" /> */}
                <Tab label = "LogOut" component={Link} to="/logout"/>
                
              </Tabs>
              </AppBar>
              
              <Switch>
      <Route exact path='/' component={Home}/>      
      <Route path='/Reg' component={Registration}/>
      <Route path='/getreport' component={getreport}/>
      <Route path='/UpdateOldData' component={UpdateOldData}/>
      <Route path='/usermanagement' component={Usermanagement}/>
      <Route path='/uploadcheck' component={FileUploadCheck}/>
      <Route path='/file-browser' component={() => { window.location = 'http://141.44.18.16:1080/file-browser'; return null;} }/>

      <Route path='/logout' component={Logout}/>
      <Route path='/login' component={Login}/>
      </Switch>
            </Fragment>
          )}
        />
    </div>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Header)
