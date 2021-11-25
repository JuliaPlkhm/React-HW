import './App.css';
import React from 'react';

class Product extends React.Component {
    render() {
        return (
            <div>
                <li style = {this.props.style} >{this.props.element}</li>
                <button onClick={this.props.handleDelete(this.props.index)}>X</button>
            </div>
        )
    }
}

class Notification extends React.Component {

    componentDidMount() {
        console.log('Did mount');
    }
    componentWillUnmount() {
        console.log('Will unmount');
    }

    render() {
        return (
            <p style={this.props.style}>Слишком много задач!</p>

        )
    }
}

class ToDoList extends React.Component {
    state = {
        task: [],
        value: "",
        color: {},
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.task.length !== this.state.task.length){
            console.log("UPDATED");
            const styleColor = { color: `rgb(${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())}, ${Math.round(255.0 * Math.random())})` };
            this.setState({
                color: styleColor,
            });
        }
       
    }

    handleClick = () => {
        this.setState({
            task: [...this.state.task, this.state.value],
            value: ''
        });
    };

    handleDelete = (index) => () => {
        const filteredState = this.state.task.filter((e, i) => i !== index)
        this.setState({
            task: filteredState
        })
    };

    handleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    };
    render() {
        return (
            <div className='main'>
                <input type='text' placeholder='Введите задачу' onChange={this.handleChange} value={this.state.value}></input>
                <button onClick={this.handleClick}>Add some task</button>
                <ul>
                    {this.state.task.map((element, index) => (
                        <Product element={element} style={this.state.color} key={index} index={index} handleDelete={this.handleDelete} />
                    ))}
                </ul>

                {this.state.task.length > 5 && <Notification />}
            </div>

        )
    }
}


export default ToDoList;