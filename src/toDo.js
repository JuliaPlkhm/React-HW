import './App.css';
import React, { useState, useEffect, useRef } from 'react';

function Task(props) {

    if (props.state) {

        return (
            <div style={props.style} className='list__item'>
                <input value={props.valueRename} type='text' className='input' onBlur={props.handleBlur(props.index)} onChange={props.handleChange('rename')} autoFocus></input>
                <button className="btn-close btn" onClick={props.handleDelete(props.index)}>x</button>
            </div>
        )

    } else {
        return (
            <div style={props.style} className='list__item'>
                <li onClick={props.handleRename(props.index)}>{props.element}</li>
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

    useEffect((prev) => {
        let styleColor = `rgb(${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())}, 0.6)`;
        setColor([...color, styleColor]);
    }, [state.length]);

    const handleClick = (event) => {
        setState([...state, value]);
        setStateRename([...stateRename, 0]);
        setValue("")
    };
    const filter = (arr, index) => arr.filter((e, i) => i !== index)

    const handleDelete = (index) => () => {
        const filteredState = filter(state, index)
        const filteredStateRename = filter(stateRename, index)
        const filteredColor = filter(color, index)
        setState(filteredState)
        setStateRename(filteredStateRename)
        setColor(filteredColor)
    };
    const handleRename = (index) => () => {
        stateRename[index] = 1
        const renameValue = [...stateRename]
        setStateRename(renameValue)
        setValueRename(state[index])

    };
    const handleChange = (set) => (event) => {
        if (set === 'value') {
            setValue(event.target.value)
        } else {
            setValueRename(event.target.value)
        }
    };

    const handleBlur = (index) => () => {
        state[index] = valueRename;
        const newState = [...state]
        setState(newState)
        stateRename[index] = 0
        const renameState = [...stateRename]
        setStateRename(renameState)
    }


    return (
        <div className='main'>
            <div className="heading container">
                <h1 >To Do List</h1>
            </div>
            <div className="list-container container">
                <div className='form'>
                    <input className='input' type='text' placeholder='Введите задачу' onChange={handleChange('value')} value={value}></input>
                    <button className="btn-add btn" onClick={handleClick}>+</button>
                </div>
                <ul className='list'>
                    {state.map((element, index) => (
                        <Task element={element} valueRename={valueRename} style={{ backgroundColor: color[index] }} key={index} index={index} state={stateRename[index]} index={index} handleRename={handleRename} handleBlur={handleBlur} handleChange={handleChange} handleDelete={handleDelete} />
                    ))}
                </ul>
            </div>
            {state.length > 5 && <Notification />}
        </div>
    );
}



export default ToDo;