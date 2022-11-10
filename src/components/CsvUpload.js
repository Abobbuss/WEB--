import React, { useState } from 'react'
import axios from "axios"


axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

function CsvUpload()  {
    const [formModel, setFormModel] = useState({
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
        console.log('FORM', document.getElementById('File').files[0]);
        axios.post('http://127.0.0.1:8000/api/csvupload/', FD, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error.response, document.getElementById('File').files[0], formModel.file)
        });





        event.preventDefault()
    }



    return (
      <div className='PostMethod'>/>
              <input onChange={handleChange} id="File" type="file" name="file" placeholder="Select csv"  />
              <button type='submit' onClick={createNote}>Create Post</button>
              <br/>

      </div>
    )
}
export default CsvUpload;
