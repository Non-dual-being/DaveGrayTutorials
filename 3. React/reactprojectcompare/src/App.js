import React from "react";
import { useState } from "react";
import Input from "./Input";
import Square from "./Square";

function App() {
  const [colorValue, setColorValue] = useState('');
  const [hexValue, setHexValue] = useState();
  const [isDarkText, setIsDarkText] = useState(true);

  return (
    <div className="appDiv">
    <Square 
      colorValue= {colorValue}
      hexValue = {hexValue} 
      isDarkText = {isDarkText}
    />
    <Input 
      colorValue={colorValue}
      setColorValue={setColorValue}
      setHexValue = {setHexValue}
      setIsDarkText = {setIsDarkText}
      hexValue = {hexValue} 
    />
    </div>
  );
}

export default App;
