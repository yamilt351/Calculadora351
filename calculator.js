import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import reactB from "https://cdn.skypack.dev/react-b@0.1.0-alpha.1";
import * as bootstrap from "https://cdn.skypack.dev/bootstrap@5.1.3";

const cD = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const o = ["AC", "/", "x", "+", "-", "="];

const n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const D = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">
      {input}
    </span>
  </div>
);

const Key = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const K = ({ handleInput }) => (
  <div className="keys">
    {cD.map((key) => (
      <Key key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
  const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [calculatorData, setCalculatorData] = React.useState("");

  const hS = () => {
    console.log({ calculatorData });

    const total = eval(calculatorData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorData(`${total}`);
  };

  const hC = () => {
    setInput("0");
    setCalculatorData("");
  };

  const h = (value) => {
    if (!calculatorData.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (calculatorData === "0" || input === "0")) {
        setCalculatorData(`${calculatorData}`);
      } else {
        const lC = calculatorData.charAt(calculatorData.length - 1);
        const isLastChatOperator =
          lC === "*" || o.includes(lC);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${calculatorData}${value}`);
      }
    }
  };

  const dO = () => {
    const lC = calculatorData.charAt(calculatorData.length - 1);
    if (!calculatorData.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lC === "*" || o.includes(lC)) {
        setInput("0.");
        setCalculatorData(`${calculatorData} 0.`);
      } else {
        setInput(
          lC === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lC === "." || input.includes(".")
            ? `${calculatorData}`
            : `${calculatorData}.`;
        setCalculatorData(formattedValue);
      }
    }
  };

  const ho = (value) => {
    if (calculatorData.length) {
      setInput(`${value}`);
      const bLC = calculatorData.charAt(calculatorData.length - 2);

      const bLCO =
        o.includes(bLC) || bLC === "*";

      const lC = calculatorData.charAt(calculatorData.length - 1);

      const lCO =
        o.includes(lC) || lC === "*";

      const valihCp = value === "x" ? "*" : value;
      if (
        (lCO && value !== "-") ||
        (bLCO && lCO)
      ) {
        if (bLCO) {
          const uV = `${calculatorData.substring(
            0,
            calculatorData.length - 2
          )}${value}`;
          setCalculatorData(uV);
        } else {
          setCalculatorData(
            `${calculatorData.substring(
              0,
              calculatorData.length - 1
            )}${valihCp}`
          );
        }
      } else {
        setCalculatorData(`${calculatorData}${valihCp}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = n.find((num) => num === value);
    const operator = o.find((op) => op === value);

    switch (value) {
      case "=":
        hS();
        break;
      case "AC":
        hC();
        break;
      case number:
        h(value);
        break;
      case ".":
        dO(value);
        break;
      case operator:
        ho(value);
        break;
      default:
        break;
    }
  };

  const hOp = () => {
    setOutput(calculatorData);
  };

  React.useEffect(() => {
    hOp();
  }, [calculatorData]);

  return (
    <div className="container">
      <div className="calculator">
        <D input={input} output={output} />
        <K handleInput={handleInput} />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
