import React, { Component } from "react";
import "./css/reg.css";
import ModernDatepicker from "react-modern-datepicker";
import axios from "axios";

class getreport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: "",
      startDate: new Date(),
      toDate: new Date(),
      report: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.downloadcsv = this.downloadcsv.bind(this);
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
    axios
      .post("http://46.101.232.21:1080/api/getreport", {
        fromdate: this.state.startDate,
        todate: this.state.toDate
      })
      .then(response => {
        this.setState({
          report: response.data.data
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
    return (
      <div>
        <form id="myForm" onSubmit={this.handleSubmit}>
          <label htmlFor="fromdate">From Date:</label>
          <ModernDatepicker
            id="orderdate"
            name="orderdate"
            type="text"
            date={startDate}
            format={"YYYY-MM-DD"}
            showBorder
            onChange={date => this.handleChange(date)}
            placeholder={"Select From Date"}
            autoComplete="off"
          />

          <label htmlFor="todate">To Date:</label>
          <ModernDatepicker
            id="todate"
            name="todate"
            type="text"
            date={toDate}
            format={"YYYY-MM-DD"}
            showBorder
            onChange={date => this.handleChange1(date)}
            placeholder={"Select To Date"}
            autoComplete="off"
          />

          <button>Download Report</button>
        </form>
      </div>
    );
  }
}

export default getreport;
