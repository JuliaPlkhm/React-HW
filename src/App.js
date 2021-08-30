import './App.css';
import React, { useState } from 'react';

const meat = 'Мясо';
const notTrue = false;

function Product(props) {
  return (
    <div>
      <li >{props.element}</li>
      <button onClick={props.handleDelete(props.index)}>X</button>
    </div>
  )
}




function App() {
  const [state, setState] = useState(["Хлеб", "Молоко", "Сыр", "Сахар"]);
  let inputValue
  const handleChange = (event) =>{
    inputValue = event.target.value
  }
  const handleClick = (props) => {
    console.log(props)

    setState([...state, inputValue])
  }
  const handleDelete = (index) => () =>{
    const filteredState = state.filter((e, i) => i !== index)
    setState(filteredState)

  }
  
  return (
    <div className = 'main'>
      <p>Список продуктов</p>
      <ul>
        {state.map((element, index) => (
          <Product element={element} key={index} index = {index} handleDelete ={handleDelete}/>
        ))}
      </ul>
      <input type ='text'  onChange = {handleChange}></input>
      <button onClick={handleClick}>Add some product</button>
    </div>
  );
}

export default App;
