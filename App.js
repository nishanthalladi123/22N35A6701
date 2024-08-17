import React, { useState, useEffect } from 'react';
import { fetchNumbers } from './services/apiservices';
import NumberDisplay from './NumberDisplay';
import AverageDisplay from './AverageDisplay';

const App = () => {
    const [windowSize] = useState(10);
    const [windowPrevState, setWindowPrevState] = useState([]);
    const [windowCurrState, setWindowCurrState] = useState([]);
    const [average, setAverage] = useState(0);

    const updateNumbers = async (type) => {
        const newNumbers = await fetchNumbers(type);

        setWindowPrevState(windowCurrState);

        const updatedState = [...windowCurrState, ...newNumbers].slice(-windowSize);
        setWindowCurrState(updatedState);

        const avg = updatedState.reduce((acc, num) => acc + num, 0) / updatedState.length;
        setAverage(avg);
    };

    useEffect(() => {
        updateNumbers('even'); // Initial load for 'even' numbers
    }, []);

    return (
        <div className="App">
            <h1>Average Calculator HTTP Microservice</h1>
            <NumberDisplay prevState={windowPrevState} currState={windowCurrState} />
            <AverageDisplay average={average} />
            <button onClick={() => updateNumbers('primes')}>Fetch Primes</button>
            <button onClick={() => updateNumbers('fibonacci')}>Fetch Fibonacci</button>
            <button onClick={() => updateNumbers('even')}>Fetch Even</button>
            <button onClick={() => updateNumbers('rand')}>Fetch Random</button>
        </div>
    );
};

export default App;
