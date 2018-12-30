import React, {Component} from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.

class Header extends Component{

  render(){
    return (
      <header>
      <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="/">RFID Inventory Portal</a>
      </div>
      <ul className="nav navbar-nav">
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/Reg'>New Product Registration</Link></li>
      <li><Link to='/getreport'>Download Report</Link></li>
      <li><Link to='/UpdateOldData'>Upload Excel</Link></li>
      <li><Link to='/usermanagement'>User Management</Link></li>
      
            
      </ul>
    </div>
      </nav>
    </header>
   
    )
  }
}

export default Header
