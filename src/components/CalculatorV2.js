import React, { useState } from 'react'
import '../Css/selectModelPage.css'

import axios from "axios";

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'

function CalculatorV2()  {
     const [value, setValue] = useState({
          a: "",
          b: ""
          })

    const handleChange = (event) => {
        let value = event.target.value;
        let name = event.target.name;

        setValue((prevalue) => {
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
        console.log('FORM', value.a, value.b);
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
              <input onChange={handleChange} id="A" type="text" name="name" placeholder="Name of model" value={value.a} />
              <input onChange={handleChange} id="B" type="file" name="file" placeholder="Select model" value={value.b} />
              <button type='submit' onClick={createNote}>Create Post</button>
              <br/>

      </div>
    )
}
export default CalculatorV2;
