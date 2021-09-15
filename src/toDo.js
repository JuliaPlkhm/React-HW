import './App.css';
import React, { useState, useEffect } from 'react';

function Task(props) {
    
    if (props.state) {
        return (
            <div style={props.style} className='list__item'>
                <input value={props.valueRename} type='text' className = 'input'  onBlur={props.handleBlur(props.index)} onChange = {props.handleChange('rename')} autofocus></input>
                <button className="btn-close btn" onClick={props.handleDelete(props.index)}>x</button>
            </div>
        )

    } else {
        return (
            <div  onClick ={props.handleRename(props.index)} style={props.style} className='list__item'>
                <li >{props.element}</li>
                <button className="btn-close btn" onClick={props.handleDelete(props.index)}>x</button>
            </div>
        )
    }
}

function Notification(props) {
    useEffect(() => {
        console.log('Did mount');
        return () => {
            console.log('Will unmount');
        }
    }, []);

    return (
        <p style={props.style}>Слишком много задач!</p>
    )
}

function ToDo() {
    const [state, setState] = useState([]);
    const [value, setValue] = useState("");
    const [color, setColor] = useState([]);
    const [stateRename, setStateRename] = useState([]);
    const [valueRename, setValueRename] = useState("");

    useEffect(() => {
        let styleColor = `rgb(${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())}, 0.6)`;
        setColor([...color, styleColor]);
    }, [state]);

    const handleClick = (event) => {
        if (value) {
            setState([...state, value]);
            setStateRename([...stateRename, 0]);
            setValue("")
        }
    };
    useEffect(() => {
        setState(state)
    }, [stateRename]);

    const handleDelete = (index) => () => {
        const filteredState = state.filter((e, i) => i !== index)
        const filteredStateRename = stateRename.filter((e, i) => i !== index)
        setState(filteredState)
        setStateRename(filteredStateRename)
    };
    const handleRename = (index) => () => {
        stateRename[index] =1
        const renameValue = [...stateRename]
        setStateRename(renameValue)
        setValueRename(state[index])
    };
    const handleChange = (set) => (event) => {
        if(set == 'value'){
        setValue(event.target.value)
        } else{
        setValueRename(event.target.value)
        }
        console.log(value)

    };

    const handleBlur = (index) => () =>{
        state[index] = valueRename;
        const newState = [...state]
        setState(newState)
        stateRename[index] = 0
        const renameValue = [...stateRename]
        setStateRename(renameValue)
    }


    return (
        <div className='main'>
            <div className="heading container">
                <h1 >To Do List</h1>
            </div>
            <div className="list-container container">
                <div className='form'>
                    <input className = 'input' set = {setValueRename} type='text' placeholder='Введите задачу' onChange={handleChange('value')} value={value}></input>
                    <button className="btn-add btn" onClick={handleClick}>+</button>
                </div>
                <ul className='list'>
                    {state.map((element, index) => (
                        <Task element={element} valueRename={valueRename} state={stateRename[index]} style={{ backgroundColor: color[index] }} key={index} index={index} handleRename ={handleRename} handleBlur ={handleBlur} handleChange ={handleChange} handleDelete={handleDelete} />
                    ))}
                </ul>
            </div>
            {state.length > 5 && <Notification />}
        </div>
    );
}



export default ToDo;