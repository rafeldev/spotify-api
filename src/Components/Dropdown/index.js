import React from 'react'


const Dropdown = props => {

  const dropdownChanged = e => {
    props.changed(e.target.value)
  }


  return (
    <div>
      <select onChange={dropdownChanged}>
        {props.options.map((item, idx) => <option key={idx} value={item.value}>{item.name}</option>)}
      </select>
      <p></p>
    </div>
  );
};

export default Dropdown;