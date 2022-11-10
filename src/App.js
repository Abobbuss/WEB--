import { useState } from "react";
import axios from "axios";
import React from "react";

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'


function App() {
  const [models, setModels] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/model/"
    );

    setModels(response.data);
  };


  return (
    <div className="App">
      <h1>Fetching models from API</h1>


      {/* Fetch data from API */}
      <div>
        <button className="fetch-button" onClick={fetchData}>
          Fetch Data
        </button>
        <br />
      </div>

      {/* Display data from API */}
      <div className="models">
        {models &&
          models.map((model, index) => {


            return (
              <div className="model" key={index}>
                <h3>Model {index + 1}</h3>
                <h2>{model.name}</h2>
                  <h2>{model.file}</h2>


              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;

