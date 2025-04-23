import { useState } from 'react';
import './App.css'
import Greeting from "./Greeting";

function App() {

  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello Vite + React!!!!</h1>
      <p>This is my first custom component</p>
      <Greeting name="Oswaldo" />

      <h2>count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Press the button
      </button>
  
      <button onClick={() => setCount(count - 1)}>
        Unpress the button
      </button>
    </div>
  );
}

export default App
