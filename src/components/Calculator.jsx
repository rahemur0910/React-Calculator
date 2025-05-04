import { useState, useEffect, useRef } from "react";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const clearInput = () => {
    setInput("");
  };

  const calculateResult = () => {
    try {
      if (input.trim() === "" || /[+\-*/.]$/.test(input)) return;
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (!isNaN(key) || "+-*/.".includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clearInput();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="calculator">
      <div className="logo-container">
        <img src="/logo.png" alt="Logo" className="logo" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={input}
        readOnly
        placeholder="0"
      />
      <div className="buttons">
        {["7", "8", "9", "/"].map((val) => (
          <button key={val} onClick={() => handleClick(val)}>{val}</button>
        ))}
        {["4", "5", "6", "*"].map((val) => (
          <button key={val} onClick={() => handleClick(val)}>{val}</button>
        ))}
        {["1", "2", "3", "-"].map((val) => (
          <button key={val} onClick={() => handleClick(val)}>{val}</button>
        ))}
        {["0", ".", "=", "+"].map((val) => (
          <button
            key={val}
            className={val === "=" ? "equalBtn" : ""}
            onClick={val === "=" ? calculateResult : () => handleClick(val)}
          >
            {val}
          </button>
        ))}
        <button onClick={clearInput} className="clear">C</button>
      </div>
    </div>
  );
}

export default Calculator;
