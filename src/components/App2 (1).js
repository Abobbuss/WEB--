import React, { useState } from "react";
import "./Css/selectModelPage.css"
import logo from "./img/1.png";
import axios from "axios";

function App2(){

    const [flag, setFlag] = useState(false);
    const [historyModel, setHistoryModel] = useState([null])



    const GetHistory = async () => {                             
        const response = await axios.get('http://127.0.0.1:8000/modelhistory');
        setHistoryModel(response.data);
        
    };

    function  switchFlag(){
        setFlag(true)
    }
    if(isLoading == true && flag){
        return(
            <div className="HistoryModel">
                <table>
                <tr className="Top-Table">
                    <th colspan="2" className="TableDate">Date</th>
                    <th className="TableValues"> Values</th>
                    <th className="ResultTable">Result</th>
                </tr>
                </table>
                <div className="Table">
                    <div className="Table-Date">
                        {historyModel.map((data, index)=>{
                            if(model.name == data.name ){
                                return(
                                    <table className="Table">
                                        <div className="Data">
                                            <th className="Th-Date">{data.data}</th> 
                                        </div>
                                        <div className="Value">
                                            <th className="Th-Value">{data.values}</th>
                                        </div>
                                        <div className="Result">
                                            <th className="Th-Result">{data.result}</th>
                                        </div>         
                                    </table>
                                )
                            }
                            
                        })}
                    </div>
                    <div className="Table-Value">
                        {historyModel.map((values, index)=>{
                            if(model.name == data.name ){
                                return(
                                    <table className="Value">
                                        <th className="Th-Value">{values}</th>   
                                    </table>
                                )
                            }
                        })}
                    </div>
                    <div className="Table-Result">
                        {historyModel.map((result)=>{
                            if(model.name == data.name ){
                                return(
                                    <table className="Result">
                                        <th className="Th-Result">{result}</th>    
                                    </table>
                                )
                            }
                            
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

export default App2;


