import { ReactNode, useState, useReducer} from 'react'

type childrenType = {
    children: (num: number) => ReactNode
}

const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
}

//enums dus gewoon getallen 0 en 1

type ReducerAction = {
    type: REDUCER_ACTION_TYPE //0 of 1
}

const initState = { count: 0 }

const reducer = (state: typeof initState, action: ReducerAction ): typeof initState => {
    switch (action.type) {
        case REDUCER_ACTION_TYPE.INCREMENT:
            return { ... state, count: state.count + 1 }
            // if you only use count {count: state.count+1}
        case REDUCER_ACTION_TYPE.DECREMENT:
            return { ... state, count: state.count - 1 }

        default: 
         throw new Error()
    }
}

/*
 reducer action is een enum dus het is hier een union type van 0 en 1 waar iniState wel geewoon een key value is met count als key en de value een nummer 
 *the ... maakt een copy van de huidge state, dit is natuurlijk react die wil dat de nieuwe waarde niet een verandering is van de oude waardde, maar een volledig nieuwe copy
 
*/




const Counter = ({ children }: childrenType) => {
    const [count, setCount] = useState<number>(1)
    const increment = () => setCount(prev => prev + 1)
    const decrement = () => setCount(prev => prev - 1)


   
    //alternative 
    const ACTIONS = {
        INCREMENT: 'INCREMENT',
        DECREMENT: 'DECREMENT',
      } as const;

      
      
    type ActionType = typeof ACTIONS[keyof typeof ACTIONS];
      // wordt nu: 'INCREMENT' | 'DECREMENT' 
      
      /**
       * as const heeft als implicatie dat je literatal types ophaalt bij type of met reandonly eigenschap
       * keyof zorg voor een sting literal union type of the keys, in volgorde is het eerst de buitenste typeof en binne de haakjes eerst de typeof en dan de keyof
       * Resultaat keyof is de string litetarel union van alle sleutels
       * Verschil met const enum is dat de enum mogelij niet werkt voor sommige compilers (bvb nextjs) en het is minder flexibel
       * Enum heeft echter geen runtime impact
       * 
       */
    


    return (
        <>
            <h1>{children(count)}</h1>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
        </>
    )
}

export default Counter