import React, {Component} from 'react'

import { Redirect } from 'react-router-dom';


class Logout extends Component{

    constructor() {
        super();
        this.state = {
          isLoggedout: false,
          count:""
        };
      }

      componentDidMount(){
          
        localStorage.removeItem("username")
        localStorage.removeItem("timestamp")
        window.location.reload();
        setTimeout(window.location.reload(), 10);
      }

    render(){           
        return(
            <div>
                <h2>You have been logged out successfully.
                </h2>
                <Redirect push to="/"/>    
            </div> 
                    
        )
    }
}

export default Logout