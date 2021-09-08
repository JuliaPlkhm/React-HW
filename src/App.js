import './App.css';
import React, { useState, memo} from 'react';
import Input from "./inputs";

const inputData = ["name", "email", "phone", "text"];




function App() {
  const [value, setValue] = useState({});

  const [data, setData] = useState(inputData)
  const [type, setType] = useState([])

  const handleAddInput = () => {
    setData([...data, `${Math.round(Math.random() * 100)}`]);
    let numberType = Math.round(Math.random() * 7)
    if (numberType == 1) {
      setType([...type, 'text'])
    } else if (numberType == 2) {
      setType([...type, 'button'])
    } else if (numberType == 3) {
      setType([...type, 'checkbox'])
    } else if (numberType == 4) {
      setType([...type, 'file'])
    } else if (numberType == 5) {
      setType([...type, 'radio'])
    } else if (numberType == 6) {
      setType([...type, 'image'])
    } else {
      setType([...type, 'password'])
    }


  };

  const handleChange = (elem) => (event) => {
    const newState = {
      ...value,
      [elem]: event.target.value,
    }
    setValue(newState)
  };
  const handleClick = () => {
    console.log(value)
  };
  return (
    <div className='main'>
      {data.map((element, index) => (
        <Input type={type[(index - 4)]} element={element} placeholder={`Введите ${element}`} onChange={handleChange(element)} ></Input>

      ))}
      <button style={{ margin: '10px' }} onClick={handleClick}>send</button>
      <button onClick={handleAddInput}>Add some input</button>
    </div>
  );
}



export default memo(App);
