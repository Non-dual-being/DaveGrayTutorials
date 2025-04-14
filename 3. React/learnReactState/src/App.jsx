import { useState } from 'react'
import Hooks from './hooks'

function App() {
  const [count, setCount] = useState(0)
  const [values, setValues] = useState([])
  const [valuesobj, setValuesobj] = useState({first: "", second: ""})
  const [showHooks, setShowHooks] = useState(false);

  const updateValues = (newVal) => {
    setValues(prev => [...prev, newVal])
  }

  const updateValuesObj = (newVal) => {
    setValuesobj(prev => ({...prev, last: "lol"}))
  }

  const learnState = 
    (<section className='appSection'>
        <h1>{count}</h1>
        <div className='myRow'>
          <button onClick={() => setCount(prevState => prevState + 1)}> + </button>
          <button onClick={() => setCount(prevState => prevState - 1)}> - </button>
        </div>
        <div className='myRow'> 
          <button onClick={() => setCount(0)}>Reset</button>
        </div>
    </section>)

  

  return (
    <>
      <button onClick={() => setShowHooks(!showHooks)}>
        toggle
      </button>
      { showHooks 
        ? <Hooks/>
        : learnState
      }
    
    </>
  )
}

export default App
