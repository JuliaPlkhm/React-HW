import './App.css';
import React, { useState, useEffect } from 'react';

function Product(props) {
  return (
    <div>
      <li style = {props.style} >{props.element}</li>
      <button onClick = {props.handleDelete(props.index)}>X</button>
    </div>
  )
}

function Notification(props) {
  useEffect(() => {
    console.log('Did mount');
    return () => {
      console.log('Will unmount');
    }
  }, []);

  return (
    <p style = {props.style}>Слишком много задач!</p>
  )
}


function App() {
  const [state, setState] = useState([]);
  const [value, setValue] = useState("");
  const [color, setColor] = useState({});

  useEffect(() => {
    const styleColor = { color: `rgb(${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())})` };
    setColor(styleColor);
  }, [state]);

  const handleClick = (props) => {
    setState([...state, value]);
    setValue("")
  };

  const handleDelete = (index) => () => {
    const filteredState = state.filter((e, i) => i !== index)
    setState(filteredState)
  };

  const handleChange = (event) => {
    setValue(event.target.value)
  };

  return (
    <div className='main'>
      <input type='text' placeholder = 'Введите задачу' onChange={handleChange} value={value}></input>
      <button onClick={handleClick}>Add some task</button>
      <ul>
        {state.map((element, index) => (
          <Product element={element} style={color} key={index} index={index} handleDelete={handleDelete} />
        ))}
      </ul>

      {state.length > 5 && <Notification />}
    </div>
  );
}



export default App;
