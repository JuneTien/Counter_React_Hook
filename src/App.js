import "./styles.css";
import { useState, useEffect, useReducer } from "react";

export default function App() {
  return (
    <div className="App">
      <Count />
      <br />
      <CountWithIntervel />
      <br />
      <CountHookReducer />
    </div>
  );
}

// hook
const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <br />
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  );
};

// hook with customize hook
const CountWithIntervel = () => {
  // useCounter is customized hook
  const { count, handleSetCount } = useCounter();
  return (
    <div>
      {count}
      <br />
      <button onClick={handleSetCount}>ADD</button>
    </div>
  );
};

const useCounter = () => {
  const [count, setCount] = useState(0);

  const handleSetCount = () => setCount((count) => count + 1);

  useEffect(() => {
    const timer = setInterval(() => {
      handleSetCount();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return { count, handleSetCount };
};

// hookReducer
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { count: state.count + 1 };
    case "minus":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const CountHookReducer = () => {
  const [state, setCount] = useReducer(reducer, { count: 0 });
  return (
    <div>
      {state.count}
      <br />
      <button onClick={() => setCount({ type: "add" })}>+</button>
      <button onClick={() => setCount({ type: "minus" })}>-</button>
    </div>
  );
};
