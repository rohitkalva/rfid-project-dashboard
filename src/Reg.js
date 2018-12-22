import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types"; 
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  cssLabel: {
    color : '#2196f3'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#A9A9A9	!important'
  },
  resize:{
    fontSize:20
  },
});

class ShakingError extends Component {
  constructor() {
    super();
    this.state = { key: 0 };
  }

  componentWillReceiveProps() {
    // update key to remount the component to rerun the animation
    // eslint-disable-next-line
    this.setState({ key: ++this.state.key });
  }

  render() {
    return (
      <div key={this.state.key} className="bounce">
        {this.props.text}
      </div>
    );
  }
}

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      res: "",
      tagvalue: "",
      fieldvalidation: true,
      lead_front:"0",
      lead_back:"0"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.timeoutfunction = this.timeoutfunction.bind(this);
    this.tagidvalidation = this.tagidvalidation.bind(this);
    this.lead_front = this.lead_front.bind(this);
    this.lead_back = this.lead_back.bind(this);
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  handleSubmit(event) {
    console.log("clicked");

    //Calculation of next inspection date. +36 Months
    var nextinspdate = new Date();

    // //add 3 Years to the date
    nextinspdate.setFullYear(nextinspdate.getFullYear() + 3);

    var y = nextinspdate.getFullYear(),
      m = nextinspdate.getMonth() + 1, // january is month 0 in javascript
      d = nextinspdate.getDate();
    var pad = function(val) {
      var str = val.toString();
      return str.length < 2 ? "0" + str : str;
    };
    nextinspdate = [y, pad(m), pad(d)].join("-");
    console.log(nextinspdate)


    event.preventDefault();
    if (!event.target.checkValidity()) {
      this.setState({
        invalid: true,
        displayErrors: true
      });
      return;
    }
    const form = event.target;
    const data = new FormData(form);

    // const inputParsers = {
    //   date(input) {
    //     const split = input.split("/");
    //     const day = split[1];
    //     const month = split[0];
    //     const year = split[2];
    //     return `${year}-${month}-${day}`;
    //   },
    //   uppercase(input) {
    //     return input.toUpperCase();
    //   },
    //   number(input) {
    //     return parseFloat(input);
    //   }
    // };

    // for (let name of data.keys()) {
    //   const input = form.elements[name];
    //   console.log(input)
    //   const parserName = input.dataset.parse;
    //   console.log('parser name is', parserName);
    //   if (parserName) {
    //     const parsedValue = inputParsers[parserName](data.get(name));
    //     data.set(name, parsedValue);
    //   }
    // }

    function stringifyFormData(fd) {
      const data = {};
      for (let key of fd.keys()) {
        data[key] = fd.get(key);
      }
      return JSON.stringify(data, null, 2);
    }
    var jsondata = JSON.parse(stringifyFormData(data));
    console.log(jsondata);

    var dbdata = JSON.stringify({
        manufacturer : jsondata.manufacturer,
        model : jsondata.model, 
        variant : jsondata.type,
        serial_no : jsondata.serialnumber,
        lead_front : jsondata.leadfront,
        lead_back : jsondata.leadback,
        year_of_mfg : jsondata.year,
        colour : jsondata.colour,
        size : jsondata.size,
        length : jsondata.length,
        tagid : jsondata.tagid,
        label : jsondata.labeling,
        localid : jsondata.identification,
        clinic : jsondata.clinic,
        building : jsondata.building,
        department : jsondata.department,
        location : jsondata.location,
        nextinspdate : nextinspdate,
        user_name : "kalva"
    });
    console.log(dbdata);
    // fetch('http://138.68.108.140:1080/registration', {
    //   method: 'POST',
    //   body: data,
    // });
    var self = this;
    axios({
      method: "post",
      // url: "http://141.44.18.16:1080/api/registration",
      url: 'http://localhost:1080/api/registration',
      data: JSON.parse(dbdata)
    })
      .then(function(response) {
        console.log(response.data.message);
        self.setState({
          res: "Entry to DataBase Successful!",
          invalid: false,
          displayErrors: false
        });
      })
      .catch(function(error) {
        console.log(error);
        self.setState({
          res:
            "Error occured. Check your entry. There might be a record with the same Tag ID.",
          invalid: false,
          displayErrors: false
        });
      });
    setTimeout(this.timeoutfunction, 7000);
    // this.changerandom(event);
  }

  // changerandom(e) {
  //   e.target.reset();
  // }

  timeoutfunction() {
    this.setState({
      res: "",
      invalid: false,
      displayErrors: false
    });
  }

  tagidvalidation(value){
    this.setState({
      tagvalue: value
    })

    if(value.length===24){
      this.setState({
        fieldvalidation: false
      })
    }
    else{
      this.setState({
        fieldvalidation: true
      })
    }
  }

  lead_front(val){
    this.setState({
      lead_front: val
    })
  }

  lead_back(val){
    this.setState({
      lead_back: val
    })
  }

  
  render() {
    const { res, invalid, displayErrors,tagvalue, fieldvalidation,lead_back, lead_front} = this.state;
    const { classes } = this.props;
    return (
      <div>
        <form
          id="myForm"
          onSubmit={this.handleSubmit}
          noValidate
          className={displayErrors ? "displayErrors" : ""}
          autoComplete="off"
        >
        
          <TextField
            className={classes.textField}
            id="tagid"
            name="tagid"
            type="text"
            label="Tag ID"
            value={tagvalue}
            margin="normal"
            variant="outlined"
            required
            maxLength="2"
            onChange={(e) =>{this.tagidvalidation(e.target.value) }}
            autoComplete="off"
            inputProps={{maxLength: 24}}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}             // eslint-disable-next-line
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize,                
              },
            }}
          />

          <br/>

          <TextField
            className={classes.textField}
            id="manufacturer"
            name="manufacturer"
            type="text"
            label="Manufacturer"
            margin="normal"
            variant="outlined"
            disabled={fieldvalidation}
            required
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="model"
            name="model"
            type="text"
            label="Model"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="type"
            name="type"
            type="text"
            label="Type"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="serialnumber"
            name="serialnumber"
            type="text"
            label="Serial Number"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <br/>

          <TextField
            className={classes.textField}
            id="leadfront"
            name="leadfront"
            type="number"     
            value={lead_front}   
            label="Lead Front"
            margin="normal"
            variant="outlined"
            required
            onChange={(e) =>{this.lead_front(e.target.value) }}
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}// eslint-disable-next-line 
            inputProps={{step: 0.01}}
          />

          <TextField
            className={classes.textField}
            id="leadback"
            name="leadback"
            type="number"
            value={lead_back}
            label="Lead Back"
            margin="normal"
            variant="outlined"
            onChange={(e) =>{this.lead_back(e.target.value) }}
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}// eslint-disable-next-line 
            inputProps={{step: 0.01}}
          />

          <TextField
            className={classes.textField}
            id="year"
            name="year"
            type="number"
            label="Year"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off" 
            // onInput = {(e) =>{e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,4)}}
            helperText="YYYY"
            inputProps={{maxLength: 4}}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }} // eslint-disable-next-line
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="colour"
            name="colour"
            type="text"
            label="Colour"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <br/>

          <TextField
            className={classes.textField}
            id="size"
            name="size"
            type="text"
            label="Size"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="length"
            name="length"
            type="text"
            label="Length"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="labeling"
            name="labeling"
            type="text"
            label="Labeling"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="identification"
            name="identification"
            type="text"
            label="Identification"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <br/>
          <TextField
            className={classes.textField}
            id="clinic"
            name="clinic"
            type="text"
            label="Clinic"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="building"
            name="building"
            type="text"
            label="Building"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <TextField
            className={classes.textField}
            id="department"
            name="department"
            type="text"
            label="Department"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />


          <TextField
            className={classes.textField}
            id="location"
            name="location"
            type="text"
            label="Location / Room"
            margin="normal"
            variant="outlined"
            required
            disabled={fieldvalidation}
            autoComplete="off"
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssOutlinedInput,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
                input: classes.resize
              },
            }}
          />

          <br/>

          <Button
            variant="contained"
            color="primary"
            disabled={fieldvalidation}
            className={classes.button}
            type="submit"
          >
            Submit
          </Button>
        </form>

        <div className="res-block">
          {invalid && <ShakingError text="Form is not valid" />}
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
Registration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Registration);
