function Model(props){
      function handleClick(){
    props.deletion(props.id)
  }
    return (
        <div className="model">
          <h1 >  Name: {props.name} </h1>
          <p > Email: {props.email}</p>
            <p > Message: {props.message}</p>
          <button onClick={handleClick}>Delete</button>
        </div>
    )
  }

export default Model;