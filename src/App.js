import React, {useState} from 'react';

const  App = () => {
  let [state, setState] = useState('titulo')
  let [inputValue, setInputValue] = useState()
  return (
    <div className="App">
      <p onClick={()=> setState('titulo final') }>{state}</p>
      <input type={'text'} vaue={inputValue} onChange={(e) =>setInputValue(e.target.value)}></input>
    </div>
  );
}

export default App;
