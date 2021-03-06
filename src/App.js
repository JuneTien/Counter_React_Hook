import "./styles.css";
import React, { useState, useEffect, useReducer, useCallback } from "react";
const LOG_ENABLED = false;

export default function App() {
  const [name, setName] = useState("");
  const [num, setNum] = useState(0);

  return (
    <div className="App">
      <div>
        hook with counter
        <Count />
      </div>
      <br />
      <div>
        custom hook
        <CountWithIntervel />
      </div>
      <br />
      <div>
        useReducer
        <CountHookReducer />
      </div>
      <br />
      <div>
        useCallback
        <ButtonCounter />
      </div>
      <br />
      <div>
        hook with counter
        <IncreaseCounter />
      </div>
      <br />
      <div>
        useMemo
        <br />
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        Friend Num:
        <input value={num} onChange={(e) => setNum(e.target.value)} />
        <div>
          <ChildEl name={name} friendCount={num} />
        </div>
      </div>
    </div>
  );
}

// useMemo
const Child = ({ name, friendCount }) => {
  LOG_ENABLED && console.log(">>render");
  return (
    <div>
      <div>{name}</div>
      <div>{friendCount}</div>
    </div>
  );
};

const ChildEl = React.memo(Child, (preProps, nextProps) => {
  if (preProps.name !== nextProps.name) {
    return false;
  } else {
    return true;
  }
});

const IncreaseCounter = () => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((counter) => counter + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return <div>{counter}</div>;
};

// useCallback
const ButtonCounter = () => {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  LOG_ENABLED && console.log(">>>[ButtonCounter] count", count);

  return <button onClick={handleClick}>count: {count}</button>;
};

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
