import "./styles.css";
import { useState, useEffect, useReducer } from "react";

export default function App() {
  return (
    <div className="App">
      <Count />
      <br />
      <CountWithIntervel />
      <br />
      <CountReducer />
    </div>
  );
}

const Count = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>ADD</button>
    </div>
  );
};

const CountWithIntervel = () => {
  const { count, handleSetCount } = useCounter();
  return (
    <div>
      {count}
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

const reducer = (state, action) => {
  switch (action.type) {
    case "aaa":
      return { count: state.count + 1 };
    case "bbb":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
};

const CountReducer = () => {
  const [state, setCount] = useReducer(reducer, { count: 0 });
  return (
    <div>
      {state.count}
      <button onClick={() => setCount({ type: "aaa" })}>十</button>
      <button onClick={() => setCount({ type: "bbb" })}>一</button>
    </div>
  );
};
