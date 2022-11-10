import "../Css/AddModel1.css"
import React, { useState } from 'react'
import axios from "axios";


axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

export default function AddModel() {


  const [formModel, setFormModel] = useState({
          name: "",
          file: ""
          })

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setFormModel((prevalue) => {
          return {
            ...prevalue,   // Spread Operator
            [name]: value
          }
        })
      }



    function createNote(event) {
        const FD = new FormData();
        FD.append('file', document.getElementById('File').files[0]);
        FD.append('name', document.getElementById('Name').value);
        console.log('FORM', formModel.name, formModel.file);
        axios.post('http://127.0.0.1:8000/api/model/', FD, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response, document.getElementById('File').files[0], document.getElementById('Name').value)
        });





        event.preventDefault()
    }

  return (
    <div className="AddPage">
      <div className="Content-Text">
        Enter the name of the model, and then upload it to the window below
      </div>
      <div className="Content-NameModel">
        <input onClick={handleChange} id="Name" placeholder="Name model" type="text" className="NameModel1"/>

      </div>
      <div className="Content-AddModel">
      <div className="input__file">

        <div className="form-group">
          <label className="label">
            <span className="title">Add file</span>
            <input onClick={handleChange} id="File" type="file"/>
          </label>
        </div>
      </div>
        <br/>
        <button onClick={createNote} className = "custom-btn btn-6">Add</button>
      </div>
    </div>
  );

}