/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// // eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect } from "react";
// import { FaMoon, FaSun } from "react-icons/fa";
// import "./App.css";

// function App() {
//   const [darkMode, setDarkMode] = useState(false);
//   const [display, setDisplay] = useState("");
//   const [time, setTime] = useState(new Date().toLocaleTimeString());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(new Date().toLocaleTimeString());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleClick = (value) => {
//     setDisplay((prevDisplay) => prevDisplay + value);
//   };

//   const handleClear = () => {
//     setDisplay("");
//   };

//   const handleCalculate = () => {
//     try {
//       setDisplay(eval(display).toString());
//     // eslint-disable-next-line no-unused-vars
//     } catch (error) {
//       setDisplay("Error");
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <div className={`app ${darkMode ? "dark" : ""}`}>
//       <div className="header">
//         <h1>Calculator</h1>
//         <div className="clock-container">
//           <Clock time={time} />
//         </div>
//         <button className="mode-toggle" onClick={toggleDarkMode}>
//           {darkMode ? <FaSun /> : <FaMoon />}
//         </button>
//       </div>
//       <div className="calculator">
//         <div className="display">
//           <input type="text" value={display} readOnly />
//         </div>
//         <div className="buttons">
//           <button onClick={() => handleClick("1")}>1</button>
//           <button onClick={() => handleClick("2")}>2</button>
//           <button onClick={() => handleClick("3")}>3</button>
//           <button onClick={() => handleClick("4")}>4</button>
//           <button onClick={() => handleClick("5")}>5</button>
//           <button onClick={() => handleClick("6")}>6</button>
//           <button onClick={() => handleClick("7")}>7</button>
//           <button onClick={() => handleClick("8")}>8</button>
//           <button onClick={() => handleClick("9")}>9</button>
//           <button onClick={() => handleClick("0")}>0</button>
//           <button onClick={() => handleClick("+")}>+</button>
//           <button onClick={() => handleClick("-")}>-</button>
//           <button onClick={() => handleClick("*")}>*</button>
//           <button onClick={() => handleClick("/")}>/</button>
//           <button onClick={handleClear}>C</button>
//           <button onClick={handleCalculate}>=</button>
//           <button onClick={() => handleClick(".")}>.</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // eslint-disable-next-line react/prop-types
// function Clock({ time }) {
//   // eslint-disable-next-line react/prop-types
//   const [hour, minute, second] = time.split(":");

//   return (
//     <div className="clock">
//       <FlippingDigit digit={hour[0]} />
//       <FlippingDigit digit={hour[1]} />
//       <span className="colon">:</span>
//       <FlippingDigit digit={minute[0]} />
//       <FlippingDigit digit={minute[1]} />
//       <span className="colon">:</span>
//       <FlippingDigit digit={second[0]} />
//       <FlippingDigit digit={second[1]} />
//     </div>
//   );
// }

// // eslint-disable-next-line react/prop-types
// function FlippingDigit({ digit }) {
//   return (
//     <div className="flip-clock">
//       <div className="flip">
//         <div className="front">{digit}</div>
//         <div className="back">{digit}</div>
//       </div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [display, setDisplay] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [prevTime, setPrevTime] = useState(time); // store the previous time to check for changes

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      setPrevTime(time);
      setTime(currentTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const handleClick = (value) => {
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleCalculate = () => {
    try {
      setDisplay(eval(display).toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Calculator</h1>
        <div className="clock-container">
          <Clock time={time} prevTime={prevTime} />
        </div>
        <button className="mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <div className="calculator">
        <div className="display">
          <input type="text" value={display} readOnly />
        </div>
        <div className="buttons">
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={handleClear}>C</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={() => handleClick(".")}>.</button>
        </div>
      </div>
    </div>
  );
}

function Clock({ time, prevTime }) {
  const [hour, minute, second] = time.split(":");
  const [prevSecond] = prevTime.split(":");

  const flipTime = hour !== prevTime.split(":")[0] || minute !== prevTime.split(":")[1] || second !== prevSecond;

  return (
    <div className="clock">
      <FlippingDigit digit={hour[0]} flip={flipTime} />
      <FlippingDigit digit={hour[1]} flip={flipTime} />
      <span className="colon">:</span>
      <FlippingDigit digit={minute[0]} flip={flipTime} />
      <FlippingDigit digit={minute[1]} flip={flipTime} />
      <span className="colon">:</span>
      <FlippingDigit digit={second[0]} flip={flipTime} />
      <FlippingDigit digit={second[1]} flip={flipTime} />
    </div>
  );
}

function FlippingDigit({ digit, flip = false }) {
  return (
    <div className="flip-clock">
      <div className={`flip ${flip ? "flip-animation" : ""}`}>
        <div className="front">{digit}</div>
        <div className="back">{digit}</div>
      </div>
    </div>
  );
}

export default App;
