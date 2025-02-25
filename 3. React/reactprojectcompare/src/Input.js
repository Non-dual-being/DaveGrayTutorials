import React, { useRef, useEffect } from "react";
import colorNames from "colornames";

const Input = ({ colorValue, setColorValue, setHexValue, setIsDarkText }) => {
  const colorInputRef = useRef();

  // Focus automatisch op het inputveld
  useEffect(() => {
    colorInputRef.current.focus();
  }, []);

  // Helper functie om helderheid te bepalen
  const isBrightBG = (hex, threshold = 128) => {
    if (!hex) return false; // Geen kleur opgegeven, beschouw als donkere achtergrond
    hex = hex.replace("#", ""); // Verwijder '#' als die er is

    // Omzetten naar RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Bereken helderheid en vergelijk met de drempelwaarde
    return r * 0.299 + g * 0.587 + b * 0.114 > threshold;
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="addColorInput">Add Color Name</label>
      <input
        type="text"
        id="addColorInput"
        ref={colorInputRef}
        placeholder="Add color name"
        value={colorValue || ""} // Zorg ervoor dat het nooit undefined is
        onChange={(e) => {
          const inputValue = e.target.value;
          setColorValue(inputValue);

          const newHexValue = colorNames(inputValue);
          setHexValue(newHexValue);

          if (newHexValue) {
            const isBright = isBrightBG(newHexValue);
            setIsDarkText(isBright); // Donkere achtergrond -> lichte tekst
          } else {
            setIsDarkText(true); // Standaard donkere tekst
          }
        }}
      />
    </form>
  );
};

export default Input;
