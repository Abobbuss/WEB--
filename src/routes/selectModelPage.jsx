import React, { Component } from 'react'
import axios from "axios";
import '../Css/selectModelPage1.css'
import fot from './selectModelPage/frontend/src/img/graph.png'
import {Outlet, Link, Route, Routes, useNavigate} from "react-router-dom";
import { useState } from 'react';
import Photo from './Photo.jsx';
import { useEffect } from 'react';
import CsvUpload from "../components/CsvUpload";


axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
axios.defaults.xsrfCookieName = 'csrftoken'


function SelectModelPage()  {


    const [allModels, setallModels] = useState(null);                //Переменные для получения всех моделек
    const [models, setModel] = useState(null);
    const [isLoading, setLoading] = useState(true);                  //Для задержки
     const [isvaluePredict, setisvaluePredict] = useState(false);
    const [idModel, setIdModel] = useState("");                    //Переменные для передачи нужного id в ToDOModel
    const [arr, setArr] = useState([]);                             //Массив для параметров
    const [arrOfInputs, setArrOfInputs] = useState("");
    const [valuePredict, setValuePredict] = useState(null);           //Значение предика
    const [inputQuantity, setInputQuantity] = useState(0);



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
    let navigate = useNavigate();
  const routeChange = () =>{
    navigate("/Photo");
  }


    function createNote(event) {
        const FD = new FormData();
        FD.append('file', document.getElementById('File').files[0]);
        console.log('FORM', document.getElementById('File').files[0]);
        axios.post('http://127.0.0.1:8000/api/csvupload/?model_id=' + idModel.toString(), FD, {
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

    function NextApp(){
        setLoading(false);
        getParameters();
    }
    //Убрать коммент тут
     const fetchData = async () => {                              //Фун-я получения всех моделек
        const response = await axios.get('http://127.0.0.1:8000/api/model/');
        const data = await setModel(response.data);
       
        return data;

    };

    const getParameters = async () =>{
        fetch("http://127.0.0.1:8000/api/mpath/?model_id=" + idModel.toString())
        .then(function(response) {
            return response.text()
        .then(function(Parameters) {
            console.log(Parameters)
            setArr(Array(...Array(Number(Parameters)).keys()));
            setInputQuantity(Number(Parameters));
  })
}, );
    }    

    async function update_inputs() {
    for (let i = 0; i < inputQuantity; i++) {
          await setArrOfInputs(prev => prev + "&" + (i+1).toString() + "=" + document.getElementById((i+1).toString()+".1").value);
        }

    }

useEffect(()=>{
    fetchData();
},[])
   function Calculate(event){





    function delay(time) {
        setTimeout(() => {}, time);
    }

    const url = ('http://127.0.0.1:8000/api/modelcalculate/?model_id='+ idModel.toString() + arrOfInputs)
    fetch(url).then(function(response) {
    return response.text().then(function(text) {
        setValuePredict(text.match(/(\d+\.\d+)|(\d+)/)[0])
    });
  });

}
//HISTORY
    const [flag, setFlag] = useState(false);
    const [historyModel, setHistoryModel] = useState([null])



    const GetHistory = async () => {
        const response = await axios.get('http://127.0.0.1:8000/api/modelhistory/');
        const data = await setHistoryModel(response.data);
        return data
    };

    function switchFlag(){
        setLoading(false);
        setFlag(true)
    }
    useEffect(()=>{
    GetHistory();
},[])


    if(isLoading){
        return (

        <div>
          <div className='Text'>
              Select the desired model from the list below
          </div>
          <div className='Poisk'>
            <form className='Poisk_form'>
                <input onChange={()=>{setIdModel((document.getElementById("selectorID").value).match(/(\d+)/)[0]) }} type="text"  placeholder="Select model" list="models_list"  aria-label="Text input with dropdown button" id="selectorID"/>
                    <datalist id="models_list">
                        {models &&
                            models.map((model, index)=>{
                                return(
                                    <li  key={index}><option  value={[model.id, model.name]} /></li>

                                )
                            })
                        }
                    </datalist>
            </form>
          </div>
            <div className='AllModels'>
                <div className='buttonGetModels'>
                    <button className="custom-btn btn-6" onClick={()=>{NextApp()}}><span>Calculations</span></button>
                </div>
                <div className='buttonGetModels'>
                    <button className="custom-btn btn-6" onClick={switchFlag}><span>Model History</span></button>
                </div>
          </div>
        </div>
    )
    }
    if(flag){
        return(

        <div className="HistoryModel">
            <table>
                <tr className="Top-Table">
                    <th colSpan="2" className="TableDate">Date</th>
                    <th className="TableValues"> Values</th>
                    <th className="ResultTable">Result</th>
                </tr>
            </table>
            <div className="Table">
                <div className="Table-Date">
                    {historyModel.map((data) => {
                        if (data.model_index == idModel.toString()) {
                            return (
                                <div className="Table">
                                    <div className="Data">
                                        <th className="Th-Date">{data.date}</th>
                                    </div>
                                    <div className="Value">
                                        <th className="Th-Value">{data.inputs}</th>
                                    </div>
                                    <div className="Result">
                                        <th className="Th-Result">{data.output}</th>
                                    </div>
                                </div>
                            )
                        }

                    })}
                </div>

            </div>
        </div>
        )
    }
    return(                                                         // return для меки
        <div className='ToDoModel'>
            <div className='Content'>
                {arr.map((parametr, index)=>{
                    return(
                        <div className="ContentTitle" key={index.toString()}>
                            <div className='NameParametr'>
                                <input id={(parametr+1)} className="InputNameParametr" type="text" placeholder={'the name of Input_' + (parametr+1)}/>
                            </div>
                            <div className='RangeParametr'>
                                <input id={(parametr+1)+".1"} type="range" onChange={() => {document.getElementById((parametr+1)+".2").value = document.getElementById((parametr+1)+".1").value}} min="0" max="50" step="0.01"/>
                            </div>
                            <div className='OutValueRange'>
                                <input id={(parametr+1)+".2"} className="InputValueRange" type="number" onChange={() => {document.getElementById((parametr+1)+".1").value = document.getElementById((parametr+1)+".2").value}} min="0" max="50" step="0.01"/>
                            </div>
                        </div>
                    )
                })}
                <div className="SM2">
                                    <p>

                <button className="custom-btn" onClick={() => {
                    let buttons = document.querySelectorAll('.button');
                        buttons[0].click();
                        setTimeout(() => {buttons[1].click();}, 1);


                }}>Get predict</button>
                </p>
                <button className="button" onClick={update_inputs}>Кликни меня!</button>
                <br/>
                <button className="button" onClick={Calculate}>CLICK</button>
                </div>
            </div>
            <div className="Predict">
                <div className="BorderValuePredict">
                    <div className='PredictValue'>
                        <h1 className="SM">{valuePredict}</h1>

                    </div>
                </div>
                <div className='CsvUpload'>
                    <div className="input__file">
                        <div className="form-group">
                          <div className="label">
                            <span className="title">Add file</span>

                          </div>
                        </div>
                    </div>
                    <div className="SM3">
                        <input onChange={handleChange} id="File" type="file" name="file"  />
                        <button type='submit' onClick={createNote} className="custom-btn">Create Post</button>
                    </div>

                  <br/>

                </div>
            </div>
            <button><a href="http://127.0.0.1:8000/static/leads/graph.png" download="My_File.png">Image Result</a><br/></button>
            <button color="primary" className="px-4"
            onClick={routeChange}
              >
              Photo
            </button>
            <Routes>
          <Route path="/Photo" element={<Photo />} />

        </Routes>


        </div>
    )

                                                                  //return temp


           
}

export default SelectModelPage;
