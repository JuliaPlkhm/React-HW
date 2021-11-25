import './App.css';
import ToDo from './ToDo/toDo';


import React, { memo } from 'react';


function App() {

  return (
    <div className='wrapper'>
     <ToDo />
    </div>
  )
}

 export default memo(App);
