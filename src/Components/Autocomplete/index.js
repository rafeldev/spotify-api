import React, { useState, useEffect, useRef } from 'react';


const Autocomplete = () => {

  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");



    return (
        <div className="search">
          <input id="auto" placeholder="Type to search" type="text" className="search-box" />
        </div>
    );
}


export default Autocomplete;