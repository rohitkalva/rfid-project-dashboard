import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Registration from './Reg'
import UpdateOldData from './UpdateOldData'


class Main extends React.Component{
   
  render(){
    return(
      <main>
    <Switch>
      <Route exact path='/' component={Home}/>      
      <Route path='/Reg' component={Registration}/>
      <Route path='/UpdateOldData' component={UpdateOldData}/>
      </Switch>
  </main>
    )
  }
}
export default Main