import React, { Component } from 'react';
import './css/reg.css';
import ModernDatepicker from 'react-modern-datepicker';
import axios from 'axios';

class ShakingError extends React.Component {
    constructor() { super(); this.state = { key: 0 }; }

    componentWillReceiveProps() {
    // update key to remount the component to rerun the animation 
    // eslint-disable-next-line
      this.setState({ key: ++this.state.key });
  }
  
  render() {
      return <div key={this.state.key} className="bounce">{this.props.text}</div>;
  }
}

class getreport extends Component {

    constructor(props) {
        super(props);
        this.state = {
          res : "",
          startDate: new Date(),
          toDate:new Date(),
          report: {}
      };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
      }

   

    handleChange(date) {
        this.setState({
          startDate: date
        });
        console.log(this.state.startDate)
      }

      handleChange1(date) {
        this.setState({
          toDate: date
        });
        console.log(this.state.toDate)
      }

      handleSubmit(event) {
        event.preventDefault();
        
        axios.post('http://46.101.232.21:1080/api/getreport', {
            fromdate: this.state.startDate,
            todate: this.state.toDate
          })
          .then((response) => {
            this.setState({
                report: response.data.data
            });
            console.log(this.state.report)
        }).catch((error) => {
            console.error(error);
        });       
    }


  render() {
    const { startDate, toDate } = this.state;
    return (

        <div>
            <form
          id="myForm"
            onSubmit={this.handleSubmit}
           > 

            <label htmlFor="fromdate">From Date:</label>
           <ModernDatepicker 
           id="orderdate"
           name="orderdate"
           type="text"
          date={startDate} 
          format={'DD-MM-YYYY'} 
          showBorder        
          onChange={(date) => this.handleChange(date)}
          placeholder={'Select From Date'}
          autoComplete="off"
        />

           <label htmlFor="todate">To Date:</label>
           <ModernDatepicker 
           id="todate"
           name="todate"
           type="text"
          date={toDate} 
          format={'DD-MM-YYYY'} 
          showBorder        
          onChange={(date) => this.handleChange1(date)}
          placeholder={'Select To Date'}
          autoComplete="off"
        />

            <button>Submit</button>
           </form>
        </div>
     
    );
  }
}

export default getreport;
