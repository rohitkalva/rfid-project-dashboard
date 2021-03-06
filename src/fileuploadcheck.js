import React, {Component} from 'react'
import axios from 'axios'

class FileUploadCheck extends Component{
    constructor() {
        super();
        this.state = {
          file: ""
        };
        this.handleselectedFile = this.handleselectedFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }


    handleselectedFile(e){
        var file = e.target.files[0]
        console.log(file)
        this.setState({
            file: file
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const {file} = this.state
        const data = new FormData();
        data.append('222233B2DDD9014000000000', file);

        axios({
            method: 'post',
            url: 'http://141.44.18.16:1080/app/imageupload/222233B2DDD9014000000000',
            data: data,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(function (response) {
                //handle success
                console.log(response.data.message);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });

    }
    

    render(){
        return(

            <div>
                <form  id="myForm" autoComplete="off" onSubmit={this.handleSubmit}  noValidate>

                <input type="file" name="" id="" onChange={this.handleselectedFile} />
                <button>Upload</button>                
                </form>
            </div>
        )
    }
}

export default FileUploadCheck
