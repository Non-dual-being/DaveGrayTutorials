import { useEffect, useState, useCallback } from "react";


const Hooks = () => {
  const [count, setCount] = useState()
  const [userInput, setUserInput] = useState("")
  const [result, setResult] = useState(0)
  const[num1] = useState(4);
  const[num2] = useState(5);
  const sum = useCallback(() => num1 + num2, [num1, num2]);

  const buildArray = useCallback(() => [num1, num2], [num1, num2]);



  useEffect(() => {
    console.log(`New sum. Value: ${sum()}`)
    setResult(sum())
    
  }, [sum]);

  useEffect(() => {
    console.log(`New Array: ${buildArray()}`);
    setResult(buildArray())

  }, [])


  return (
    <main className="App">
      <input 
        type="text" 
        placeholder="input" 
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)} 
      />
      <h1>Output: {userInput || "--"}</h1>
    </main>
  )
}

export default Hooks

/**
 * without useCallback which builds up a reference for sum, it will end in a endless loop
 * This is becauze sum is rerender every time the component renders and cuz state is update with set result
 * the components rerenders and sum is called in the useEffect again
 */