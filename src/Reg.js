import React, {Component} from 'react';
import './css/reg.css';
import axios from 'axios';
import ModernDatepicker from 'react-modern-datepicker';


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
  
  class Registration extends Component {
    constructor() {
      super();
      this.state = {
        res : "",
    };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.changerandom = this.changerandom.bind(this);
      this.timeoutfunction = this.timeoutfunction.bind(this);
    }

    
  
    handleSubmit(event) {
      event.preventDefault();
      if (!event.target.checkValidity()) {
          this.setState({
          invalid: true,
          displayErrors: true,
        });
        return;
      }
      const form = event.target;
      const data = new FormData(form);
      
    const inputParsers = {
    date(input) {
      const split = input.split('/');
      const day = split[1]
      const month = split[0];
      const year = split[2];
      return `${year}-${month}-${day}`;
     },
     uppercase(input) {
      return input.toUpperCase();
     },
     number(input) {
       return parseFloat(input);
      },
     };
  
  
      for (let name of data.keys()) {
        const input = form.elements[name];
        const parserName = input.dataset.parse;
        //console.log('parser name is', parserName);
        if (parserName) {
          const parsedValue = inputParsers[parserName](data.get(name))
          data.set(name, parsedValue);
        }
      }
      
      
  function stringifyFormData(fd) {
    const data = {};
      for (let key of fd.keys()) {
        data[key] = fd.get(key);
    }
    return JSON.stringify(data, null, 2);
  }
      var jsondata = JSON.parse(stringifyFormData(data))
      //console.log(jsondata)

      var dateString = jsondata.purchasedate;
      var nextinspdate = new Date(dateString);

      //add 3 Years to the date
     nextinspdate.setFullYear(nextinspdate.getFullYear() +3);

      var y = nextinspdate.getFullYear(),
      m = nextinspdate.getMonth() + 1, // january is month 0 in javascript
      d = nextinspdate.getDate();
      var pad = function(val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str};
      dateString = [y, pad(m), pad(d)].join("-");

      var dbdata = JSON.stringify({
    "tagid": jsondata.tagid, "equipment": jsondata.equipment, "orderdate": jsondata.orderdate, "equipment_type": jsondata.equipment_type, "labelling": jsondata.labelling, "nextinspdate":jsondata.nextinspdate, "username": jsondata.username      
    })
    console.log(dbdata)    
      // fetch('http://138.68.108.140:1080/registration', {
      //   method: 'POST',
      //   body: data,
      // });
      var self = this;
      axios({
        method: 'post',
        url: 'http://46.101.232.21:1080/api/registration',
        //url: 'http://localhost:1080/registration',
        data: JSON.parse(dbdata)
      })
      .then(function (response) {
        console.log(response.data.message);
        self.setState({
          res: "Entry to DataBase Successful!",
          invalid: false,
          displayErrors: false,
        });
      })
      .catch(function (error) {
        console.log(error);
        self.setState({
          res: "Error occured. Check your entry. There might be a record with the same Tag ID.",
          invalid: false,
          displayErrors: false,
        });
      });
      setTimeout(this.timeoutfunction, 7000);
      this.changerandom(event);    
    }

    changerandom(e){
      e.target.reset();
    }

    timeoutfunction(){
      this.setState({
        res: "",
        invalid: false,
        displayErrors: false,
      });
    }

  
  
    render() {
        const { res, invalid, displayErrors } = this.state;
      return (
          <div>
          <form
          id="myForm"
            onSubmit={this.handleSubmit}
            noValidate
            className={displayErrors ? 'displayErrors' : ''}
           >          
            <label htmlFor="tagid">Tag ID:</label>
            <input
              id="tagid"
              name="tagid"
              type="text"
              autoComplete="off"
              required
            />

            <label htmlFor="equipment">Equipment:</label>
            <input
              id="equipment"
              name="equipment"
              type="text"
              autoComplete="off"
              //data-parse="uppercase"
              required
            />
  
            <label htmlFor="equipment_type">Equipment Type:</label>
            <input
              id="equipment_type"
              name="equipment_type"
              type="text"
              autoComplete="off"
              //data-parse="uppercase"
              required
            />

            <label htmlFor="orderdate">Order Date:</label>
            <input
              id="orderdate"
              name="orderdate"
              type="text"
              data-parse="date"
              placeholder="MM/DD//YYYY"
              pattern="\d{2}\/\d{2}/\d{4}"
              autoComplete="off"
              required
            />

            <label htmlFor="labelling">Label ID:</label>
            <input
              id="labelling"
              name="labelling"
              type="text"
              autoComplete="off"
              required
            />

            <label htmlFor="nextinspdate">Upcoming Inspection Date:</label>
            <input
              id="nextinspdate"
              name="nextinspdate"
              type="text"
              data-parse="date"
              placeholder="MM/DD//YYYY"
              pattern="\d{2}\/\d{2}/\d{4}"
              autoComplete="off"
              required
            />

            <label htmlFor="username">Employee Name:</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="off"
              required
            />
  
            <button>Submit</button>
          </form>
          
          
          
          <div className="res-block">
            {invalid && (
              <ShakingError text="Form is not valid" />
            )}
            {!invalid && res && (
              <div>
                <pre> {res} </pre>
              </div>
            )}
           
          </div>
          </div>
      );
    }
  }

  export default Registration;
  