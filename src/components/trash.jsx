import React, {useState, } from "react";


function SelectModelPageTrash()  {

    const[names, setName] = useState(null);

    const fetchData = async () => {
        const response = await (
            "http://127.0.0.1:8000/api/model/"                  //API
        );
        setName(response.data);
    }
return (

      <div className='SelectModelPage'>
        <div className='Text'>
            Select the desired model from the list below
        </div>
        <div className='Poisk'>
            <input type="text"  placeholder="Enter the model name" list="models_list"  aria-label="Text input with dropdown button" onClick={fetchData}/>
                <datalist id="models_list" className='Poisk_option'>
                    {names.map((Name, index ) =>{
                        return(
                            <div key={index}>
                                <option value={Name.name}/>
                            </div>
                        )
                    })}
                </datalist>
                <div className='Poisk_Button'>
                <a href='toDoModel'><button className="custom-btn btn">Go</button></a>
                </div>
        </div>
      </div>
    )
}

export default SelectModelPageTrash;