import React, { useState } from 'react'
import '../Css/selectModelPage.css'

import axios from "axios";

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

function PostMethod()  {
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
      <div className='PostMethod'>
              <input onChange={handleChange} id="Name" type="text" name="name" placeholder="Name of model" value={formModel.name} />
              <input onChange={handleChange} id="File" type="file" name="file" placeholder="Select model" value={formModel.file} accept="model/h5"/>
              <button type='submit' onClick={createNote}>Create Post</button>
              <br/>

      </div>
    )
}
export default PostMethod;
