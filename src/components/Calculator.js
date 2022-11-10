import ReactDOM from "react-dom/client";
import { useState } from "react";
import axios from "axios";

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'


function Calculator(){

    var [value, setValue] = useState("5")
    function sm(VALUE){
        setValue(value = VALUE)
    }

    function calculate(event){
        const a=document.getElementById("A").value;
        const b=document.getElementById("B").value;
     fetch('http://127.0.0.1:8000/api/calculator/?a='+a+"&b="+b).then(function(response) {
    return response.text().then(function(text) {
        console.log(text)
        window.alert(text)
        sm(text)
    });
  });

        event.preventDefault()


  }

    return(
  <div className='PostMethod'>
      <input type="text" name="a" placeholder="A" id="A"/>
      <br/>
      <input  type="text" name="b" placeholder="B" id="B" />
      <br/>
      <button type='submit' onClick={calculate}>CLICK</button>
      <br/>
      <h1>{value}</h1>

</div>
);
}



  export default Calculator


