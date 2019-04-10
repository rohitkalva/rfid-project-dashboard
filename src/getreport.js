import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
  root: {
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightRegular,
  },
  form: {
    fontSize: theme.typography.pxToRem(18),
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 4,
  },
});

class getreport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
      startDate:"",
      toDate: "",
      report: "",
      date:"",
      errormsg: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.downloadcsv = this.downloadcsv.bind(this);
    this.currentdate = this.currentdate.bind(this);
    this.date = this.date.bind(this);
    this.handleSubmitDate = this.handleSubmitDate.bind(this);
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
    date = [y, pad(m), pad(d)].join("-");

    function getDateDiffInYears(date1, date2) {
      var dateParts1 = date1.split('-')
        , dateParts2 = date2.split('-')
        , d1 = new Date(dateParts1[0], dateParts1[1]-1, dateParts1[2])
        , d2 = new Date(dateParts2[0], dateParts2[1]-1, dateParts2[2])
    
      return new Date(d1 - d2).getYear() - new Date(0).getYear() + 1;
    }
    
    var diff = getDateDiffInYears(date, '2012-07-03');
    
    console.log(diff); // => 7 years

    this.setState({      
      startDate: date,
      toDate: date,
      date: date
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
    axios.post("http://141.44.18.16:1080/api/getreport", {
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

  //Function to setstate
  date(date){
    this.setState({
      date: date
    })
  }

  //Function to handle OnSubmit for date report
  handleSubmitDate(event) {
    event.preventDefault();

    //Axios get call to send and retreive data from API
    const {date} = this.state
    const url = "http://141.44.18.16:1080/api/getdayreport/"+date
    axios.get(url)
      .then(response => {
        if(response.data.report === "No inspections found for given date"){
          this.setState({
            errormsg: response.data.report
          })
        }
        else{
        this.setState({
          report: response.data.report
        });

        console.log(this.state.report);
        this.downloadcsv(this.state.report);
      }})
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
    const { startDate, toDate, date, errormsg } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Report for Date Range</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
        <form id="myForm" onSubmit={this.handleSubmit} className={classes.container} autoComplete="off"> 
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
   
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Download Report
          </Button>
        </form>
        </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Report for Given Date</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
        <form id="myForm" onSubmit={this.handleSubmitDate} className={classes.form} autoComplete="off"> 
        {errormsg}
        <br/>
       <TextField
        id="date"
        label="Date"
        type="date"
        value={date}
        className={classes.textField}
        onChange={(e) =>{this.date(e.target.value) }}
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
        </ExpansionPanelDetails>
          </ExpansionPanel>
      </div>
    );
  }
}

getreport.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles) (getreport);
