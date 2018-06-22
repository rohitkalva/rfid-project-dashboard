import React, {Component} from 'react';
import './reg.css';
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
  
  class Registration extends Component {
    constructor() {
      super();
      this.state = {
        res : ""
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
      var inspdate = new Date(dateString);

      //add 3 Years to the date
     inspdate.setFullYear(inspdate.getFullYear() +3);

      var y = inspdate.getFullYear(),
      m = inspdate.getMonth() + 1, // january is month 0 in javascript
      d = inspdate.getDate();
      var pad = function(val) { var str = val.toString(); return (str.length < 2) ? "0" + str : str};
      dateString = [y, pad(m), pad(d)].join("-");

      var dbdata = JSON.stringify({
    "tagID": jsondata.tagID, "product": jsondata.product, "purchasedate": jsondata.purchasedate, "invoicenumber": jsondata.invoicenumber, "nextinspdate": dateString      
    })
    console.log(dbdata)    
      // fetch('http://138.68.108.140:1080/registration', {
      //   method: 'POST',
      //   body: data,
      // });
      var self = this;
      axios({
        method: 'post',
        url: 'http://138.68.108.140:1080/registration',
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
            <h2>Inventory and Maintenance portal for Medical Equipment</h2>
          <form
          id="myForm"
            onSubmit={this.handleSubmit}
            noValidate
            className={displayErrors ? 'displayErrors' : ''}
           >
            <label htmlFor="tagID">Tag ID:</label>
            <input
              id="tagID"
              name="tagID"
              type="text"
              required
            />

            <label htmlFor="product">Product:</label>
            <input
              id="product"
              name="product"
              type="text"
              //data-parse="uppercase"
              required
            />
  
            <label htmlFor="purchasedate">Purchase Date:</label>
            <input
              id="purchasedate"
              name="purchasedate"
              type="text"
              data-parse="date"
              placeholder="MM/DD//YYYY"
              pattern="\d{2}\/\d{2}/\d{4}"
              required
            />

            <label htmlFor="invoicenumber">Invoice Number:</label>
            <input
              id="invoicenumber"
              name="invoicenumber"
              type="text"
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
  