import logo from './logo.svg';
import './App.css';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = "53TZSW2YRVXTWGNI33U5I6WBMM5DCP4DUY";

const NETWORKS= ['https://api.etherscan.io/', 'https://api-rinkeby.etherscan.io/'];

function App() {
  const [state, setState] = useState({});
  const [result, setResult] = useState({});

  const handleChange = useCallback((event) => {
    const { target: { value, name }} = event;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }, []);

  useEffect(() => {
    if (state.network && state.address){
      axios.get(`${state.network}api?module=account&action=balancemulti&address=${state.address}&tag=latest&apikey=${API_KEY}`
      ).then((response) => {
        setResult(response.data);
      })
    }
  }, [state])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        Network
        <select name="network" onChange={handleChange}>
        <option value=""></option>
          {NETWORKS.map((network) => (
            <option value={network}> {network}</option>
          ))}
        </select>
      </div>
      <div>
        Dirección: 
        <input 
        type="text" 
        name="address" 
        value={state.address}
        onChange={handleChange}
        />
        </div>
        {/* <div>{JSON.stringify(state)}</div> */}
        <div>{JSON.stringify(result)}</div>
    </div>
  );
}

export default App;
