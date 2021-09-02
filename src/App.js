import './App.css';
import React, { useState } from 'react';

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
  const [value, setValue] = useState("");

 
  const handleClick = (props) => {
    setState([...state, value]);
    setValue("")
  }
  const handleDelete = (index) => () => {
    const filteredState = state.filter((e, i) => i !== index)
    setState(filteredState)
  }
  const handleChange = (event) => {
    setValue(event.target.value)

  }

  return (
    <div className='main'>
      <p>Список продуктов</p>
      <ul>
        {state.map((element, index) => (
          <Product element={element} key={index} index={index} handleDelete={handleDelete} />
        ))}
      </ul>
      <input type='text' placeholder='Введите продукт' onChange={handleChange} value ={value}></input>
      <button onClick={handleClick}>Add some product</button>
    </div>
  );
}

export default App;
