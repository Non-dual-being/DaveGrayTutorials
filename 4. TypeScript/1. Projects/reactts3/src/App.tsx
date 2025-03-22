import Counter from "./Counter"


function App() {


  return (
    <>
      <div className="myApp">
        <Counter>
          {(num) => <strong>I have so much IQ {num}</strong>}
        </Counter>

                  
        </div>
    </>
  )
}

export default App
