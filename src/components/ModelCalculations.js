
import React, {useEffect, useState} from "react";
import '../App.css'

function App2() {
    let a =[{}];
  let b = null;
    const [inputQuantity, setInputQuantity] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [arr, setArr] = useState([]);
    const [arrOfInputs, setArrOfInputs] = useState("");



  let parameters = [useState(a)];
function allClick() {
  let buttons = document.querySelectorAll('.button');
  for(let i = 0; i < buttons.length; i++){
    buttons[i].click();
  }
}

function Calculate(event){
    const url = ('http://127.0.0.1:8000/api/modelcalculate/?model_id=23' + arrOfInputs)
    fetch(url).then(function(response) {
    return response.text().then(function(text) {
        console.log(text)
        window.alert(text)
    });
  });





    }


async function update_inputs() {
    for (let i = 0; i < inputQuantity; i++) {
          await setArrOfInputs(prev => prev + "&" + (i+1).toString() + "=" + document.getElementById((i+1).toString()).value);
        }

    }
function update(){
          Calculate();

}

useEffect(() => {
    setTimeout(() => {
                fetch("http://127.0.0.1:8000/api/mpath/?model_id=5")
                    .then(function(response) {
                return response.text()
                    .then(function(Parameters) {
                    b = Number(Parameters);
                        setArr(Array(...Array(b).keys()));
                    setInputQuantity(Number(Parameters));
                  setLoading(false);
              })
            }, );
        setLoading(false)
      }, 0);
},[]);







  if(isLoading) {

      return(
          <h1>Loading</h1>

      );
  }


  return(

    <div className="App2">
        <div>
           {arr.map((sm, index) =>{
            return(

                    <li key={index.toString()}>
                        <input id={(sm+1)} type="text" placeholder={"Input"+(sm+1)}/><input id={(sm+1)} type="range" placeholder={"Input"+(sm+1)}/>
                         <br/>
                    </li>


            )
        })}
             <button className="button" onClick={update_inputs}>Кликни меня!</button>
             <br/>
            <button className="button" onClick={Calculate}>CLICK</button>

            <p>
                <button onClick={() => {
                    let buttons = document.querySelectorAll('.button');
                        buttons[0].click();
                        setTimeout(() => {buttons[1].click();}, 0);

                }}>Нажать на все</button>
            </p>
        </div>

    </div>
  )







}

export default App2;