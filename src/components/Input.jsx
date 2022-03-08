import React from "react";
import '../scss/components/input.scss'


const Input = (props) => {
  const inputType = props.type || "text";
  const htmlFor = `${inputType}-${Math.random()}`;
  // console.log(props);

  return (
    <div className="input">
      <input
        value={props.value}
        id={htmlFor}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />

      {props.formErrors ? 
        <span>{props.formErrors}</span> :
        ''
        
      }
    </div>
  );
};

export default Input;
