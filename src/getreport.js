import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import axios from "axios";

const styles = theme => ({
  container: {
    marginLeft: 30,
    marginTop: 30
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit
  },
});

class getreport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
      startDate:"",
      toDate: "",
      report: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.downloadcsv = this.downloadcsv.bind(this);
    this.currentdate = this.currentdate.bind(this);
  }

  componentDidMount(){
    this.currentdate();
  }

  currentdate(){
    var date = new Date();
    var y = date.getFullYear(),
      m = date.getMonth() + 1, // january is month 0 in javascript
      d = date.getDate();
    var pad = function(val) {
      var str = val.toString();
      return str.length < 2 ? "0" + str : str;
    };
    date = [pad(d), pad(m), y].join("-");

    this.setState({      
      startDate: date,
      toDate: date
    })
  }

  //Function to handle from date
  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  //Function to hande todate
  handleChange1(date) {
    this.setState({
      toDate: date
    });
  }

  //Function for onclick event. 
  handleSubmit(event) {
    event.preventDefault();

    //Axios post call to send and retreive data from API
    axios.post("http://localhost:1080/api/getreport", {
        fromdate: this.state.startDate + " 00:00:00",
        todate: this.state.toDate + " 23:59:59"
      })
      .then(response => {
        this.setState({
          report: response.data.report
        });
        console.log(this.state.report);
        this.downloadcsv(this.state.report);
      })
      .catch(error => {
        console.error(error);
      });
  }

  //Function to download csv into file
  downloadcsv(args) {
    var data, filename, link;
    var csv = this.convertArrayOfObjectsToCSV({
      data: args
    });
    console.log(csv);
    if (csv == null) return;

    filename = args.filename || "report.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = "data:text/csv;charset=utf-8," + csv;
    }
    data = encodeURI(csv);

    link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  }

  //function to convert JSON into csv string.
  convertArrayOfObjectsToCSV(args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ",";
    lineDelimiter = args.lineDelimiter || "\n";

    keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }


  render() {
    const { startDate, toDate } = this.state;
    const { classes } = this.props;

    return (
      <div>
        <form id="myForm" onSubmit={this.handleSubmit} className={classes.container} autoComplete="off"> 
        <br/>
      <TextField
        id="fromdate"
        label="From"
        type="date"
        value={startDate}
        className={classes.textField}
        onChange={(e) =>{this.handleChange(e.target.value) }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    
      <TextField
        id="todate"
        label="From"
        type="date"
        value={toDate}
        className={classes.textField}
        onChange={(e) =>{this.handleChange1(e.target.value) }}
        InputLabelProps={{
          shrink: true,
        }}
      />
   
   <br/>
   <br/>
   <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Download Report
          </Button>
        </form>
      </div>
    );
  }
}

getreport.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles) (getreport);
