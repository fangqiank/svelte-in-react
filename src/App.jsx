import { useState, useRef, useLayoutEffect } from 'react'
import Hello from './components/Hello.svelte'
import Counter from './components/Counter.svelte'
import {useStore}  from './store'

const SvelteWrapper = component => {
  return props => {
    const svelteRef = useRef()

    useLayoutEffect(() => {
      while(svelteRef.current?.firstChild)
        svelteRef.current?.firstChild?.remove()
      
      new component({
        target: svelteRef.current,
        props
      })
    }, [])

    return <div ref={svelteRef}></div>
  }
}

const SvelteHello = SvelteWrapper(Hello)
const SvelteCounter = SvelteWrapper(Counter)

function App() {
  // const [count, setCount] = useState(1)
  const { count, increment } = useStore()

  return (
    <>
      <SvelteHello
        extraText='This is a prop passed from React to Svelte'
        onClick={() => alert('Got click from svelte')} 
      />
      
      {/* <button className="btn btn-success" onClick={() => setCount(prev => prev + 1)}>
        count is {count}
      </button> */}

      <button className="btn btn-success" onClick={increment}>
        count is {count}
      </button>

      <SvelteCounter />
    </>
  )
}

export default App
