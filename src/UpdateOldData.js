import React, {Component} from 'react';
import './App.css';
import XLSX from 'xlsx';

class UpdateOldData extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jsondata: {}
    };
    this.onChange = this.onChange.bind(this);
    this.dataparse = this.dataparse.bind(this);
    this.arrayToRows = this.arrayToRows.bind(this);
  }

  //Function to convert XLX/XLXS file to json
  onChange(e) {
    let files = e.target.files;
    var result = {};
    let reader = new FileReader();
    reader.readAsArrayBuffer(files[0]);
    reader.onload = function (e) {
      var data = e.target.result;
      data = new Uint8Array(data);
      var workbook = XLSX.read(data, {
        type: 'array'
      });
      console.log(workbook);

      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1
        });
        if (roa.length) result[sheetName] = roa;
      });
      this.setState({
        jsondata: result
      })
      this.dataparse(this.state.jsondata)
    }.bind(this);
  }

  dataparse(data) {
    var david = this.arrayToRows(data.export)
    console.log(david)
  }

  //Function to convert 2D array to standard JSON object and return to dataparse
  arrayToRows(arr) {
    var defs = [];
    var rows = [];
    var r;
    var obj;

    var headerRow = arr.shift(); //remove header row
    defs = headerRow.map(function (cell) {
      return {
        field: cell,
        displayName: cell
      }
    });

    for (var i = 0; i < arr.length; i++) {
      r = arr[i];
      obj = {};

      for (var j = 0; j < defs.length; j++) {
        obj[defs[j].field] = r[j];
      }
      rows.push(obj);
    }
    return rows;
  }

  render() {
    return (

      <div onSubmit = {this.onFormSubmit} >
      <h1 > Upload the file here </h1> 
      <input type = "file"
      name = "file"
      onChange = {(e) => this.onChange(e)}/>

      </div>
    );
  }
}

export default UpdateOldData;