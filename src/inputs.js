import React, { memo } from "react"




function Input(props) {
   return(
    <div>
    <div>
        <label>{`${props.element}:`}</label>
    </div>
    <input type= {props.type} placeholder={props.placeholder} onChange={props.onChange} ></input>
</div>
   )
}
export default memo(Input)